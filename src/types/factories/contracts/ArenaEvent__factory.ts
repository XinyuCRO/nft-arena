/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ArenaEvent,
  ArenaEventInterface,
} from "../../contracts/ArenaEvent";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "eventName",
        type: "string",
      },
      {
        internalType: "string",
        name: "eventDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "coverURI",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_isCheckedIn",
        type: "bool",
      },
    ],
    name: "CheckedIn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "TicketBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_address",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "buySpecifiedTicket",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "buyTicket",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "ticketOwner",
        type: "address",
      },
    ],
    name: "checkInTicket",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getMessageHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMetaData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSoldTokenIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTickets",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isCheckedIn",
            type: "bool",
          },
        ],
        internalType: "struct ArenaEvent.Ticket[]",
        name: "tickets",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002d6f38038062002d6f833981016040819052620000349162000466565b8551869084906200004d90600090602085019062000298565b5080516200006390600190602084019062000298565b505050620000806200007a6200016d60201b60201c565b62000171565b85516200009590600e90602089019062000298565b5060108490558451620000b090600f90602088019062000298565b508051620000c690601390602084019062000298565b50600c80546001600160a01b03191630179055600d829055620000e987620001c3565b816001600160401b038111156200011057634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156200013a578160200160208202803683370190505b508051620001519160119160209091019062000327565b50506012805460ff191660011790555062000594945050505050565b3390565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600a546001600160a01b03163314620002235760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6001600160a01b0381166200028a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016200021a565b620002958162000171565b50565b828054620002a69062000541565b90600052602060002090601f016020900481019282620002ca576000855562000315565b82601f10620002e557805160ff191683800117855562000315565b8280016001018555821562000315579182015b8281111562000315578251825591602001919060010190620002f8565b50620003239291506200037f565b5090565b82805482825590600052602060002090810192821562000315579160200282015b828111156200031557825182546001600160a01b0319166001600160a01b0390911617825560209092019160019091019062000348565b5b8082111562000323576000815560010162000380565b80516001600160a01b0381168114620003ae57600080fd5b919050565b600082601f830112620003c4578081fd5b81516001600160401b0380821115620003e157620003e16200057e565b604051601f8301601f19908116603f011681019082821181831017156200040c576200040c6200057e565b8160405283815260209250868385880101111562000428578485fd5b8491505b838210156200044b57858201830151818301840152908201906200042c565b838211156200045c57848385830101525b9695505050505050565b600080600080600080600060e0888a03121562000481578283fd5b6200048c8862000396565b60208901519097506001600160401b0380821115620004a9578485fd5b620004b78b838c01620003b3565b975060408a0151915080821115620004cd578485fd5b620004db8b838c01620003b3565b965060608a0151955060808a0151915080821115620004f8578485fd5b620005068b838c01620003b3565b945060a08a0151935060c08a015191508082111562000523578283fd5b50620005328a828b01620003b3565b91505092959891949750929550565b600181811c908216806200055657607f821691505b602082108114156200057857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6127cb80620005a46000396000f3fe6080604052600436106101b75760003560e01c80636352211e116100ec578063ba86a10d1161008a578063df6889d811610064578063df6889d81461050d578063e985e9c514610520578063edca914c14610569578063f2fde38b1461057157600080fd5b8063ba86a10d14610461578063c87b56dd146104c6578063d2786ba4146104e657600080fd5b80638da5cb5b116100c65780638da5cb5b146103ee57806395d89b411461040c578063a22cb46514610421578063b88d4fde1461044157600080fd5b80636352211e1461039957806370a08231146103b9578063715018a6146103d957600080fd5b806325103a9c1161015957806342842e0e1161013357806342842e0e146103155780634ed02622146103355780634f090be2146103575780634f6ccce71461037957600080fd5b806325103a9c146102cc5780632f745c59146102df5780633eaaf86b146102ff57600080fd5b8063095ea7b311610195578063095ea7b31461024b57806318160ddd1461026d57806318bad2171461028c57806323b872dd146102ac57600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d73660046124d3565b610591565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b506102066105d5565b6040516101e89190612661565b34801561021f57600080fd5b5061023361022e36600461250b565b610667565b6040516001600160a01b0390911681526020016101e8565b34801561025757600080fd5b5061026b6102663660046124aa565b610701565b005b34801561027957600080fd5b506008545b6040519081526020016101e8565b34801561029857600080fd5b50600c54610233906001600160a01b031681565b3480156102b857600080fd5b5061026b6102c7366004612360565b610833565b61026b6102da366004612523565b6108ba565b3480156102eb57600080fd5b5061027e6102fa3660046124aa565b610bfa565b34801561030b57600080fd5b5061027e600d5481565b34801561032157600080fd5b5061026b610330366004612360565b610ca2565b34801561034157600080fd5b5061034a610cbd565b6040516101e891906125cc565b34801561036357600080fd5b5061036c610d89565b6040516101e8919061261d565b34801561038557600080fd5b5061027e61039436600461250b565b610de0565b3480156103a557600080fd5b506102336103b436600461250b565b610e92565b3480156103c557600080fd5b5061027e6103d436600461230d565b610f1d565b3480156103e557600080fd5b5061026b610fb7565b3480156103fa57600080fd5b50600a546001600160a01b0316610233565b34801561041857600080fd5b5061020661101d565b34801561042d57600080fd5b5061026b61043c366004612470565b61102c565b34801561044d57600080fd5b5061026b61045c36600461239b565b61103b565b34801561046d57600080fd5b5061027e61047c36600461250b565b600c5460405160609190911b6bffffffffffffffffffffffff1916602082015260348101829052600090605401604051602081830303815290604052805190602001209050919050565b3480156104d257600080fd5b506102066104e136600461250b565b6110c9565b3480156104f257600080fd5b506104fb61115d565b6040516101e896959493929190612674565b61027e61051b36600461250b565b61133b565b34801561052c57600080fd5b506101dc61053b36600461232e565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61027e611573565b34801561057d57600080fd5b5061026b61058c36600461230d565b61176a565b60006001600160e01b031982167f780e9d630000000000000000000000000000000000000000000000000000000014806105cf57506105cf8261184c565b92915050565b6060600080546105e4906126fd565b80601f0160208091040260200160405190810160405280929190818152602001828054610610906126fd565b801561065d5780601f106106325761010080835404028352916020019161065d565b820191906000526020600020905b81548152906001019060200180831161064057829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166106e55760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061070c82610e92565b9050806001600160a01b0316836001600160a01b031614156107965760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084016106dc565b336001600160a01b03821614806107b257506107b2813361053b565b6108245760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016106dc565b61082e83836118e7565b505050565b61083d3382611955565b6108af5760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016106dc565b61082e838383611a4c565b600a546001600160a01b031633146109145760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106dc565b6001600160a01b038116600090815260146020908152604080832080548251818502810185019093528083529192909190849084015b8282101561098e57600084815260209081902060408051808201909152600285029091018054825260019081015460ff16151582840152908352909201910161094a565b50505050905060008151116109e55760405162461bcd60e51b815260206004820152601560248201527f4e6f207469636b657420746f20636865636b20696e000000000000000000000060448201526064016106dc565b60005b8151811015610bb05783828281518110610a1257634e487b7160e01b600052603260045260246000fd5b6020026020010151600001511415610b9e57818181518110610a4457634e487b7160e01b600052603260045260246000fd5b602002602001015160200151610b9e576001828281518110610a7657634e487b7160e01b600052603260045260246000fd5b602090810291909101810151911515918101919091526001600160a01b0384166000908152601490915260409020805482908110610ac457634e487b7160e01b600052603260045260246000fd5b600091825260208083206002909202909101828155600101805460ff191690556001600160a01b038516825260149052604090208251839083908110610b1a57634e487b7160e01b600052603260045260246000fd5b602090810291909101810151825460018082018555600094855293839020825160029092020190815590820151908301805460ff191691151591909117905560408051878152918201929092526001600160a01b038516917fd68bcac84e9fe47182a8ace1a74997ef8d9f574b94ec2c4b2bdf6f5f55e35caf910160405180910390a25b80610ba881612738565b9150506109e8565b5060408051848152600060208201526001600160a01b038416917fd68bcac84e9fe47182a8ace1a74997ef8d9f574b94ec2c4b2bdf6f5f55e35caf910160405180910390a2505050565b6000610c0583610f1d565b8210610c795760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e647300000000000000000000000000000000000000000060648201526084016106dc565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61082e8383836040518060200160405280600081525061103b565b60125460609060ff16610d125760405162461bcd60e51b815260206004820152601360248201527f4576656e74206973206e6f74206163746976650000000000000000000000000060448201526064016106dc565b33600090815260146020908152604080832080548251818502810185019093528083529193909284015b82821015610d8057600084815260209081902060408051808201909152600285029091018054825260019081015460ff161515828401529083529092019101610d3c565b50505050905090565b6060601680548060200260200160405190810160405280929190818152602001828054801561065d57602002820191906000526020600020905b815481526020019060010190808311610dc3575050505050905090565b6000610deb60085490565b8210610e5f5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e6473000000000000000000000000000000000000000060648201526084016106dc565b60088281548110610e8057634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b0316806105cf5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e000000000000000000000000000000000000000000000060648201526084016106dc565b60006001600160a01b038216610f9b5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f20616464726573730000000000000000000000000000000000000000000060648201526084016106dc565b506001600160a01b031660009081526003602052604090205490565b600a546001600160a01b031633146110115760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106dc565b61101b6000611c24565b565b6060600180546105e4906126fd565b611037338383611c76565b5050565b6110453383611955565b6110b75760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016106dc565b6110c384848484611d45565b50505050565b6060601380546110d8906126fd565b80601f0160208091040260200160405190810160405280929190818152602001828054611104906126fd565b80156111515780601f1061112657610100808354040283529160200191611151565b820191906000526020600020905b81548152906001019060200180831161113457829003601f168201915b50505050509050919050565b60608060008060006060600e600f601054600d54601260009054906101000a900460ff16601385805461118f906126fd565b80601f01602080910402602001604051908101604052809291908181526020018280546111bb906126fd565b80156112085780601f106111dd57610100808354040283529160200191611208565b820191906000526020600020905b8154815290600101906020018083116111eb57829003601f168201915b5050505050955084805461121b906126fd565b80601f0160208091040260200160405190810160405280929190818152602001828054611247906126fd565b80156112945780601f1061126957610100808354040283529160200191611294565b820191906000526020600020905b81548152906001019060200180831161127757829003601f168201915b505050505094508080546112a7906126fd565b80601f01602080910402602001604051908101604052809291908181526020018280546112d3906126fd565b80156113205780601f106112f557610100808354040283529160200191611320565b820191906000526020600020905b81548152906001019060200180831161130357829003601f168201915b50505050509050955095509550955095509550909192939495565b6000600d54821061138e5760405162461bcd60e51b815260206004820152601360248201527f45786365656420746f74616c20737570706c790000000000000000000000000060448201526064016106dc565b6010543410156113e05760405162461bcd60e51b815260206004820152600e60248201527f4e6f7420656e6f7567682043524f00000000000000000000000000000000000060448201526064016106dc565b60125460ff166114325760405162461bcd60e51b815260206004820152601360248201527f4576656e74206973206e6f74206163746976650000000000000000000000000060448201526064016106dc565b6000828152601560205260409020546001600160a01b0316156114975760405162461bcd60e51b815260206004820152600c60248201527f416c726561647920736f6c64000000000000000000000000000000000000000060448201526064016106dc565b6114a13383611dce565b336000818152601460209081526040808320815180830183528781528084018581528254600180820185559387528587209251600290910290920191825551908201805460ff19169115159190911790558684526015835281842080546001600160a01b031916861790556016805491820181559093527fd833147d7dc355ba459fc788f669e58cfaf9dc25ddcd0702e87d69c7b512428990920185905590518481527f985d112c54c7518a49841fc37640d9ded60112ea7370ca9129c8ed33c3607bc7910160405180910390a25090565b6000600d54611581600b5490565b106115ce5760405162461bcd60e51b815260206004820152601960248201527f4e6f206d6f7265207469636b65747320617661696c61626c650000000000000060448201526064016106dc565b6010543410156116205760405162461bcd60e51b815260206004820152600e60248201527f4e6f7420656e6f7567682043524f00000000000000000000000000000000000060448201526064016106dc565b60125460ff166116725760405162461bcd60e51b815260206004820152601360248201527f4576656e74206973206e6f74206163746976650000000000000000000000000060448201526064016106dc565b600061167d600b5490565b90506116893382611dce565b611697600b80546001019055565b336000818152601460209081526040808320815180830183528681528084018581528254600180820185559387528587209251600290910290920191825551908201805460ff19169115159190911790558584526015835281842080546001600160a01b031916861790556016805491820181559093527fd833147d7dc355ba459fc788f669e58cfaf9dc25ddcd0702e87d69c7b512428990920184905590518381527f985d112c54c7518a49841fc37640d9ded60112ea7370ca9129c8ed33c3607bc7910160405180910390a2919050565b600a546001600160a01b031633146117c45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106dc565b6001600160a01b0381166118405760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016106dc565b61184981611c24565b50565b60006001600160e01b031982167f80ac58cd0000000000000000000000000000000000000000000000000000000014806118af57506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806105cf57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316146105cf565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061191c82610e92565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166119ce5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016106dc565b60006119d983610e92565b9050806001600160a01b0316846001600160a01b03161480611a145750836001600160a01b0316611a0984610667565b6001600160a01b0316145b80611a4457506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316611a5f82610e92565b6001600160a01b031614611adb5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016106dc565b6001600160a01b038216611b565760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016106dc565b611b61838383611f1c565b611b6c6000826118e7565b6001600160a01b0383166000908152600360205260408120805460019290611b959084906126e6565b90915550506001600160a01b0382166000908152600360205260408120805460019290611bc39084906126ce565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03161415611cd85760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016106dc565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611d50848484611a4c565b611d5c84848484611fd4565b6110c35760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016106dc565b6001600160a01b038216611e245760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016106dc565b6000818152600260205260409020546001600160a01b031615611e895760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016106dc565b611e9560008383611f1c565b6001600160a01b0382166000908152600360205260408120805460019290611ebe9084906126ce565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160a01b038316611f7757611f7281600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611f9a565b816001600160a01b0316836001600160a01b031614611f9a57611f9a8382612137565b6001600160a01b038216611fb15761082e816121d4565b826001600160a01b0316826001600160a01b03161461082e5761082e82826122ad565b60006001600160a01b0384163b1561212c57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290612018903390899088908890600401612590565b602060405180830381600087803b15801561203257600080fd5b505af1925050508015612062575060408051601f3d908101601f1916820190925261205f918101906124ef565b60015b612112573d808015612090576040519150601f19603f3d011682016040523d82523d6000602084013e612095565b606091505b50805161210a5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016106dc565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611a44565b506001949350505050565b6000600161214484610f1d565b61214e91906126e6565b6000838152600760205260409020549091508082146121a1576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b6008546000906121e6906001906126e6565b6000838152600960205260408120546008805493945090928490811061221c57634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050806008838154811061224b57634e487b7160e01b600052603260045260246000fd5b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061229157634e487b7160e01b600052603160045260246000fd5b6001900381819060005260206000200160009055905550505050565b60006122b883610f1d565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b80356001600160a01b038116811461230857600080fd5b919050565b60006020828403121561231e578081fd5b612327826122f1565b9392505050565b60008060408385031215612340578081fd5b612349836122f1565b9150612357602084016122f1565b90509250929050565b600080600060608486031215612374578081fd5b61237d846122f1565b925061238b602085016122f1565b9150604084013590509250925092565b600080600080608085870312156123b0578081fd5b6123b9856122f1565b93506123c7602086016122f1565b925060408501359150606085013567ffffffffffffffff808211156123ea578283fd5b818701915087601f8301126123fd578283fd5b81358181111561240f5761240f612769565b604051601f8201601f19908116603f0116810190838211818310171561243757612437612769565b816040528281528a602084870101111561244f578586fd5b82602086016020830137918201602001949094529598949750929550505050565b60008060408385031215612482578182fd5b61248b836122f1565b91506020830135801515811461249f578182fd5b809150509250929050565b600080604083850312156124bc578182fd5b6124c5836122f1565b946020939093013593505050565b6000602082840312156124e4578081fd5b81356123278161277f565b600060208284031215612500578081fd5b81516123278161277f565b60006020828403121561251c578081fd5b5035919050565b60008060408385031215612535578182fd5b82359150612357602084016122f1565b60008151808452815b8181101561256a5760208185018101518683018201520161254e565b8181111561257b5782602083870101525b50601f01601f19169290920160200192915050565b60006001600160a01b038087168352808616602084015250836040830152608060608301526125c26080830184612545565b9695505050505050565b602080825282518282018190526000919060409081850190868401855b828110156126105781518051855286015115158685015292840192908501906001016125e9565b5091979650505050505050565b6020808252825182820181905260009190848201906040850190845b8181101561265557835183529284019291840191600101612639565b50909695505050505050565b6020815260006123276020830184612545565b60c08152600061268760c0830189612545565b82810360208401526126998189612545565b9050866040840152856060840152841515608084015282810360a08401526126c18185612545565b9998505050505050505050565b600082198211156126e1576126e1612753565b500190565b6000828210156126f8576126f8612753565b500390565b600181811c9082168061271157607f821691505b6020821081141561273257634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561274c5761274c612753565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461184957600080fdfea26469706673582212206e1c5305aa04418efb7baf2b9e12fec21b62a5bef73038d1ecf66cd6f080136b64736f6c63430008040033";

type ArenaEventConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArenaEventConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArenaEvent__factory extends ContractFactory {
  constructor(...args: ArenaEventConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    owner: string,
    eventName: string,
    eventDescription: string,
    price: BigNumberish,
    tokenSymbol: string,
    totalSupply: BigNumberish,
    coverURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ArenaEvent> {
    return super.deploy(
      owner,
      eventName,
      eventDescription,
      price,
      tokenSymbol,
      totalSupply,
      coverURI,
      overrides || {}
    ) as Promise<ArenaEvent>;
  }
  override getDeployTransaction(
    owner: string,
    eventName: string,
    eventDescription: string,
    price: BigNumberish,
    tokenSymbol: string,
    totalSupply: BigNumberish,
    coverURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      owner,
      eventName,
      eventDescription,
      price,
      tokenSymbol,
      totalSupply,
      coverURI,
      overrides || {}
    );
  }
  override attach(address: string): ArenaEvent {
    return super.attach(address) as ArenaEvent;
  }
  override connect(signer: Signer): ArenaEvent__factory {
    return super.connect(signer) as ArenaEvent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArenaEventInterface {
    return new utils.Interface(_abi) as ArenaEventInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArenaEvent {
    return new Contract(address, _abi, signerOrProvider) as ArenaEvent;
  }
}
