//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Math/SafeMath.sol";

contract VerifiedVoting is Ownable{

    using SafeMath for uint;

    mapping (address => bool) internal _voteStatus;
    mapping (address => bool) public candidacy;
    mapping (address => uint) public candidateIds;

    struct Candidate {
        uint id;
        uint voteCount;
        address identity;
    }

    Candidate[] candidates;

    uint public voteDuration = 1 weeks;
    uint public voteStart;

    uint entranceFee = 0.1 ether;

    constructor() Ownable() {}

    modifier inSession(){
        require(block.timestamp - voteStart <= voteDuration);
        _;
    }

    modifier outOfSession() {
        require(!((block.timestamp - voteStart) <= voteDuration) || (block.timestamp < voteStart));
        _;
    }

    modifier preSession() {
        require(block.timestamp < voteStart);
        _;
    }

    //Set Vote Duration
    function setVoteDuration(uint _duration) public onlyOwner {
        voteDuration = _duration;
    }

    //Set Vote Start Date
    function setVoteStartDate(uint _date) public onlyOwner {
        voteStart = _date;
    }

    //Enter Race
    function enterRace() payable public preSession {
        require(msg.value == entranceFee, "FEE ERROR: Please send the correct amount");
        require(!candidacy[msg.sender], "ENTRANCE ERROR: Already a candidate");

        // length returns next element's index
        uint id = candidates.length;
        Candidate memory newCandidate = Candidate(id, 0, msg.sender);
        candidates.push(newCandidate);
        candidateIds[msg.sender] = id;
        candidacy[msg.sender] = true;
    }

    //Cast Votes
    function castVote(address _candidate) public inSession {
        require(!_voteStatus[msg.sender], "VOTE ERROR: Address has already cast vote");
        require(candidacy[_candidate], "VOTE ERROR: Candidate not running");

        //Find canddidate ID (index in 'candidates') in 'candidateIds' then increment candidate voteCount
        candidates[candidateIds[_candidate]].voteCount.add(1);
        _voteStatus[msg.sender] = true;

    }

    //Check Vote Status
    function checkVoteResults() public view returns(Candidate[] memory){
        return candidates;
    }

    //Reset


}
