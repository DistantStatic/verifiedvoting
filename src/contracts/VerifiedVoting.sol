//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Math/SafeMath.sol";

contract VerifiedVoting is Ownable{

    using SafeMath for uint;

    //addres has voted
    mapping (address => bool) internal _voteStatus;

    //address is candidate
    mapping (address => bool) public candidacy;

    //address candidate id (index in candidates[])
    mapping (address => uint) public candidateIds;

    //Candidate information and vote count
    struct Candidate {
        uint id;
        uint voteCount;
        address identity;
    }

    //list of candidates
    Candidate[] public candidates;

    //voting period
    uint public voteDuration = 1 weeks;

    //start of voting period
    uint public voteStart;

    //fee to become candidate - economical filter of spam
    //to be replaced with NFT
    uint entranceFee = 0.1 ether;

    constructor() Ownable() {}

    //is voting period active
    modifier inSession(){
        require(block.timestamp - voteStart <= voteDuration + voteStart, "VOTE ERROR: Not In Session");
        _;
    }

    //is voting period ended or hasn't started
    modifier outOfSession() {
        require(!((block.timestamp - voteStart) <= voteDuration) || (block.timestamp < voteStart));
        _;
    }

    //is before next voting period
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
