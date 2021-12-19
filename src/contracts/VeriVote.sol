//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

//Refactor of VerifiedVoting
contract VeriVote{

    struct Vote {
        address identity;
        address candidate;
    }

    struct VoteTotal {
        address candidate;
        uint votes;
    }

    struct Election{
        mapping (address=>bool) candidates;
        Vote[] votes;
    }

    Election[] elections;

    function _getCurrentElectionIndex() private view returns (uint) {
        return elections.length - 1;
    }

    function _getCurrentElection() private view returns (Election storage) {
        return elections[_getCurrentElectionIndex()];
    }

    function _getElection(uint _index) private view returns (Election storage) {
        return elections[_index];
    }

    function _hasVoted(address _voter) private view returns (bool) {
        uint currentIndex = _getCurrentElectionIndex();
        for (uint i = 0; i < elections[currentIndex].votes.length; i++) {
            if (elections[currentIndex].votes[i].identity == _voter) {
                return true;
            }
        }
        return false;
    }

    //Should not be callled, only "vote" should be called
    function _castVote(address _voter, address _candidate) private {
        elections[_getCurrentElectionIndex()].votes.push(Vote(_voter, _candidate));
    }

    function _candidacy(address _candidate) private view returns(bool) {
        Election storage current = _getCurrentElection();
        return current.candidates[_candidate];
    }

    //This is ugly and has a nasty big O but mappings can't
    function _calcWinner(uint _electionIndex) private view {
        Election storage current = _getElection(_electionIndex);
        VoteTotal[] memory voteTotals;
        for (uint i = 0; i < current.votes.length; i++){

        }
    }

    function enterRace() public payable {
        require (msg.value == 0.1 ether, "Please send 0.1 ether");
        require(!_candidacy(msg.sender), "Already a candidate");
        elections[_getCurrentElectionIndex()].candidates[msg.sender] = true;
    }

    function vote(address _candidate) public {
        require(!_hasVoted(msg.sender));
        require(_candidacy(_candidate));
        _castVote(msg.sender, _candidate);
    }

}
