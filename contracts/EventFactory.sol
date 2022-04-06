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

    function createEvent(address owner, string memory eventName, string memory eventDescription, uint price, string memory tokenSymbol, uint totalSupply, string memory baseURI) public {
      ArenaEvent newEvent = new ArenaEvent(owner, eventName, eventDescription, price, tokenSymbol, totalSupply, baseURI);
      _events.push(newEvent);
      _eventMap[newEvent._address()] = newEvent;
      emit EventCreated(newEvent._address());
    }

    function getMessageHash(address _eventAddress, uint256 _tokenId) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_eventAddress, _tokenId));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        private
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        private
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }

    function checkIn(address _signer, address _eventAddress, uint256 _tokenId, bytes memory _signature) public payable returns(bool) {
        ArenaEvent mEvent = _eventMap[_eventAddress];
        require(mEvent._address() != address(0), "Not found Event");

        bytes32 messageHash = getMessageHash(_eventAddress, _tokenId);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        bool verified = recoverSigner(ethSignedMessageHash, _signature) == _signer;        
        if (verified) {
            mEvent.checkInTicket(_tokenId, _signer);
        }
        return verified;
    }
}
