// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract IssueFactory {
    address[] public Issueaddress;
    event saveIssue(
        string title,
        string disc,
        string img,
        address indexed owner,
        address indexed issueaddress,
        uint256 time
    );

    function CreateIssue(
        string memory _title,
        string memory _disc,
        string memory _img
    ) public {
        Issue newIssuse = new Issue(_title, _disc, _img, msg.sender);
        Issueaddress.push(address(newIssuse));
        emit saveIssue(
            _title,
            _disc,
            _img,
            msg.sender,
            address(newIssuse),
            block.timestamp
        );
    }
}

contract Issue {
    string public I_title;
    string public I_disc;
    string public I_img;
    address public Owner;
    uint256 public Vote;
    event Showvote(uint256 Votevalue, address Voter, uint256 time);

    constructor(
        string memory _I_title,
        string memory _I_disc,
        string memory _I_img,
        address _Owner
    ) {
        I_title = _I_title;
        I_disc = _I_disc;
        I_img = _I_img;
        Owner = _Owner;
    }

    function VoteforIssue(uint256 _vote) public {
        Vote = _vote;
        emit Showvote(Vote, msg.sender, block.timestamp);
    }
}
