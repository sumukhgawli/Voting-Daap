//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract Greeter {
    string public admin;
    enum stage{register,vote,result}
    stage public currstage;
    uint256 candidateno;
    struct voter {
        uint age;
        bool vote;
    }
    struct candidate {
        uint256 votecount;
    }
    mapping(string => voter) public voterdata;
    mapping(string => candidate) public candidatedata;

    constructor(string memory _admin) {
        admin = _admin;
        currstage = stage.register;
        candidatedata["tcsc"].votecount = 0;
        candidatedata["tcet"].votecount = 0;
    }
    function setcurrstage(uint _index ) public {
        // require(keccak256(abi.encodePacked(admin)) == keccak256(abi.encodePacked(_addr)));
        if(_index == 1){
            currstage = stage.vote;
        }
        if(_index == 2){
            currstage = stage.result;
        }
    }
    // Voter register
    function registervoter(string memory _addr, uint age) public {
        require(currstage == stage.register,"Register stage is unavailable");
        voterdata[_addr] = voter(age, false);
    }
    // Voter vote
    function vote(string memory _addr, string memory _name) public returns (bool) {
        require(voterdata[_addr].vote == false, "You have already voted");
        require(voterdata[_addr].age >= 18, "You are underage");
        require(currstage == stage.vote,"Voting stage is unavailable");
        candidatedata[_name].votecount += 1;
        voterdata[_addr].vote = true;
        return true;
    }
    function display() public view returns (string memory) {
        require(currstage == stage.result,"Result stage is unavailable");
        if (candidatedata["tcsc"].votecount > candidatedata["tcet"].votecount) {
            return "tcsc";
        } else {
            return "tcet";
        }
    }
}
