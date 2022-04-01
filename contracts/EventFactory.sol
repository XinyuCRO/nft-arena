// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ArenaEvent.sol";

contract EventManager is Ownable {

    address public _address;
    mapping(address => ArenaEvent) _eventMap;
    ArenaEvent[] _events;

    event EventCreated(address indexed eventAddress);

    constructor() {
        _address = address(this);
        _events = new ArenaEvent[](0);
    }

    function getEvent(address eventAddress) public view returns (ArenaEvent) {
        return _eventMap[eventAddress];
    }

    function getEvents() public view returns (ArenaEvent[] memory) {
        return _events;
    }

    function createEvent(string memory eventName, string memory eventDescription, uint price, string memory tokenSymbol, uint totalSupply, string memory baseURI) public {
      ArenaEvent newEvent = new ArenaEvent(eventName, eventDescription, price, tokenSymbol, totalSupply, baseURI);
      _events.push(newEvent);
      _eventMap[newEvent._address()] = newEvent;
      emit EventCreated(newEvent._address());
    }

    function checkInTicket(address eventAddress, uint256 tokenId) public payable {
        ArenaEvent mEvent = _eventMap[eventAddress];
        require(mEvent._address() != address(0), "Not found Event");

        mEvent.checkInTicket(tokenId);
    }

}
