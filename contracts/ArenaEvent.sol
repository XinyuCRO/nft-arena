// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract ArenaEvent is ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address public _address;
  uint public _totalSupply;

  string _name;
  string _description;
  uint _price;

  address[] _issuedAddress;
  bool _isActive;


  string _coverURI;

  event TicketBought(address indexed _buyer, uint _tokenId);
  event CheckedIn(address indexed _user, uint256 _tokenId, bool _isCheckedIn);

  struct Ticket {
      uint id;
      bool isCheckedIn;
  }

  mapping(address => Ticket[]) _userTicketMap;
  mapping(uint256 => address) _totalTickets;
  uint256[] _soldTokenIds;

  constructor(address owner, string memory eventName, string memory eventDescription, uint price, string memory tokenSymbol, uint totalSupply, string memory coverURI) ERC721(eventName, tokenSymbol) {
    _name = eventName;
    _price = price;
    _description = eventDescription;
    _coverURI = coverURI;

    _address = address(this);
    _totalSupply = totalSupply;

    transferOwnership(owner);

    _issuedAddress = new address[](totalSupply);
    _isActive = true;
  }

  function getMetaData() public view  returns (string memory, string memory, uint, uint256, bool, string memory) {
    return (_name, _description, _price, _totalSupply, _isActive, _coverURI);
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    return _coverURI;
  }

  function _baseURI() internal view override returns (string memory) {
    return _coverURI;
  }

  function buyTicket() public payable returns(uint256 tokenId) {
    require(_tokenIds.current() < _totalSupply, "No more tickets available");
    require(msg.value >= _price, "Not enough CRO");
    require(_isActive, "Event is not active");

    uint256 newItemId = _tokenIds.current();

    _mint(msg.sender, newItemId); 
    _tokenIds.increment();

    _userTicketMap[msg.sender].push(Ticket(newItemId, false));
    _totalTickets[newItemId] = msg.sender;
    _soldTokenIds.push(newItemId);
    emit TicketBought(msg.sender, newItemId);
    return newItemId;
  }

  function buySpecifiedTicket(uint256 id) public payable returns(uint256 tokenId) {
    require(id < _totalSupply, "Exceed total supply");
    require(msg.value >= _price, "Not enough CRO");
    require(_isActive, "Event is not active");
    require(_totalTickets[id] == address(0), "Already sold");

    _mint(msg.sender, id);

    _userTicketMap[msg.sender].push(Ticket(id, false));
    _totalTickets[id] = msg.sender;
    _soldTokenIds.push(id);
    emit TicketBought(msg.sender, id);
    return id;
  }

  function getSoldTokenIds() public view returns(uint256 [] memory) {
    return _soldTokenIds;
  }

  function getTickets() public view returns (Ticket[] memory tickets) {
    require(_isActive, "Event is not active");
    return _userTicketMap[msg.sender];
  }

  function getMessageHash(uint256 tokenId) public view returns (bytes32) {
        return keccak256(abi.encodePacked(_address,tokenId));
    }

  function checkInTicket(uint256 tokenId, address ticketOwner) public payable onlyOwner {
    Ticket[] memory tickets = _userTicketMap[ticketOwner];
    require(tickets.length > 0, "No ticket to check in");
    for (uint i = 0; i < tickets.length; i++) {
      if(tickets[i].id == tokenId) {
        if (!tickets[i].isCheckedIn) {
          tickets[i].isCheckedIn = true;
          delete _userTicketMap[ticketOwner][i];
          _userTicketMap[ticketOwner].push(tickets[i]);
          emit CheckedIn(ticketOwner, tokenId, true);
        }
      }
    }
    emit CheckedIn(ticketOwner, tokenId, false);
  }
}
