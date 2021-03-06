//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

//Refactor of VerifiedVoting
contract VeriVote is Ownable{
    struct Vote {
        address identity;
        address candidate;
    }

    struct VoteTotal {
        address candidate;
        uint votes;
    }

    //TODO: Possible change of votes data structure to array instead of mapping
    //as Election structs are not being dynamically created but rather tracked
    //by mapping
    struct Election{
        address[] candidates;
        
        //dynamically creating structs with struct arrays no supported by Solidity yet
        //Vote[] votes;

        //dynaically creating structs with nested mapping are not able to be pushed into struct arrays
        mapping(uint=>Vote) votes;
        uint voteIndex;
    }

    //Election[] elections;

    //using mapping we can still use struct and a mapping as a makeshift dynamic array
    mapping(uint=>Election) elections;

    uint public electionCount;

    //voting period; can be set by setVoteDuration function
    uint public voteDuration = 1 weeks;

    //start of voting period
    uint public voteStart;

    //fee to become candidate - economical filter of spam
    //to be replaced with NFT
    uint public entranceFee = 0.1 ether;

    constructor() Ownable() {}

    //is voting period active
    modifier inSession(){
        require(block.timestamp >= voteStart && block.timestamp <= (voteStart + voteDuration), "VOTE ERROR: Not In Session");
        _;
    }

    //is not in voting period
    modifier outOfSession() {
        require(((block.timestamp - voteStart) >= voteDuration || block.timestamp < voteStart || voteStart <= 0), 'Vote in Session');
        _;
    }

    //is before next voting period
    modifier preSession() {
        require(voteStart > 0 && block.timestamp < voteStart, 'Not in PreSession');
        _;
    }

    //Returns start date unix
    function getVoteStartDate() public view returns(uint) {
        return voteStart;
    }

    //Set Vote Duration
    function _setVoteDuration(uint _duration) private {
        voteDuration = _duration;
    }

    //Set Vote Start Date
    function _setVoteStartDate(uint _date) private {
        voteStart = _date;
    }

    function _getCurrentElection() private view returns (Election storage) {
        return elections[electionCount];
    }

    function _getElection(uint _index) private view returns (Election storage) {
        return elections[_index];
    }

    function _hasVoted(address _voter) private view returns (bool) {
        Election storage current = _getCurrentElection();
        for (uint i = 0; i <= current.voteIndex; i++) {
            if (current.votes[i].identity == _voter) {
                return true;
            }
        }
        return false;
    }

    //Should not be callled, only "vote" should be called
    function _castVote(address _voter, address _candidate) private {
        Election storage current = _getCurrentElection();
        current.voteIndex++;
        current.votes[current.voteIndex] = Vote(_voter, _candidate);
    }

    function _candidacy(address _candidate) private view returns(bool) {
        Election storage current = _getCurrentElection();
        for (uint i = 0; i < current.candidates.length; i++){
            if (current.candidates[i] == _candidate) {
                return true;
            }
        }
        return false;
    }

    //Winner calculations should be done by reading votes array for each election externally
    //function calcWinner() public view returns (address) {
    //
    //}

    //elections start at 1
    function createNewElection(uint _date, uint _duration) public onlyOwner outOfSession {
        _setVoteDuration(_duration);
        _setVoteStartDate(_date);
        electionCount++;
    }

    function enterRace() public payable preSession {
        require (msg.value == 0.1 ether, "Please send 0.1 ether");
        require(!_candidacy(msg.sender), "Already a candidate");
        elections[electionCount].candidates.push(msg.sender);
    }

    function vote(address _candidate) public inSession {
        require(!_hasVoted(msg.sender), "This addess has already voted");
        require(_candidacy(_candidate), "Address not a candidate");
        _castVote(msg.sender, _candidate);
    }

}
