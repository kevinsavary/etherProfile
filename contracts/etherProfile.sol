pragma solidity >=0.4.22 <0.9.0;

import "./Ownable.sol";

contract etherProfile is Ownable {
    string message; //this is for testing

    // Custom Types
    struct Profile {
        uint id;
        address payable profileOwner;
        string emailAdress;
        string profilePhotoUrl;
    }

    // State variables
    mapping(uint => Profile) public profiles;
    uint profileCounter;
    address payable profileOwner;
    string emailAdress;
    string profilePhotoUrl;

    function kill() public onlyOwner {
        selfdestruct(owner);
    }

    function addProfile(string memory _emailAdress, string memory _profilePhotoUrl) public {
        profileCounter++;
        // need to check if profile owner is already in the contract!
        profiles[profileCounter] = Profile(
            profileCounter,
            payable(msg.sender),
            _emailAdress,
            _profilePhotoUrl
        );
        message = _profilePhotoUrl; //for testing only - TO REMOVE!

    }

    //add function: is profile address owner already listed?

    // for testing initially

    constructor() {
        message = "hello";
    }

    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
    

}