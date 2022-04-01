// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract ArenaEvent is ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address _owner;
  address public _address;
  uint public _totalSupply;

  string _name;
  string _description;
  uint _price;

  address[] _issuedAddress;
  address[] _checkedInAddress;
  bool _isActive;

  event TicketBought(address indexed _buyer, uint _tokenId);

  constructor(string memory eventName, string memory eventDescription, uint price, string memory tokenSymbol, uint totalSupply) ERC721(eventName, tokenSymbol) {
    _name = eventName;
    _price = price;
    _description = eventDescription;

    _address = address(this);
    _totalSupply = totalSupply;
    _owner = msg.sender;

    _issuedAddress = new address[](totalSupply);
    _checkedInAddress = new address[](totalSupply);
    _isActive = true;
  }

  function getMetaData() public view  returns (string memory, string memory, uint, uint256, bool) {
    return (_name, _description, _price, _totalSupply, _isActive);
  }

  function buyTicket() public payable returns(uint tokenId) {

    require(_tokenIds.current() < _totalSupply, "No more tickets available");
    require(msg.value >= _price, "Not enough CRO");
    require(_isActive, "Event is not active");

    uint256 newItemId = _tokenIds.current();

    _mint(msg.sender, newItemId);
    _tokenIds.increment();

    emit TicketBought(msg.sender, newItemId);

    return newItemId;
  }

}
