// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ArenaEvent.sol";

contract EventManager is Ownable {

    address public _address;
    ArenaEvent[] public _events;

    event EventCreated(address indexed eventAddress);

    constructor() {
        _address = address(this);
        _events = new ArenaEvent[](0);
    }

    function getEvent(uint tokenId) public view returns (ArenaEvent) {
        return _events[tokenId];
    }

    function getEvents() public view returns (ArenaEvent[] memory) {
        return _events;
    }

    function createEvent(string memory eventName, string memory eventDescription, uint price, string memory tokenSymbol, uint totalSupply, string memory baseURI) public {
      ArenaEvent newEvent = new ArenaEvent(eventName, eventDescription, price, tokenSymbol, totalSupply, baseURI);
      _events.push(newEvent);
      emit EventCreated(newEvent._address());
    }

}
