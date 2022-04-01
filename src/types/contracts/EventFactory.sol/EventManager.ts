/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface EventManagerInterface extends utils.Interface {
  functions: {
    "_address()": FunctionFragment;
    "checkInTicket(address,uint256,address)": FunctionFragment;
    "createEvent(address,string,string,uint256,string,uint256,string)": FunctionFragment;
    "getEvent(address)": FunctionFragment;
    "getEvents()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_address"
      | "checkInTicket"
      | "createEvent"
      | "getEvent"
      | "getEvents"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "_address", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "checkInTicket",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "createEvent",
    values: [string, string, string, BigNumberish, string, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "getEvent", values: [string]): string;
  encodeFunctionData(functionFragment: "getEvents", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "_address", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkInTicket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEvent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getEvent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getEvents", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "EventCreated(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EventCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface EventCreatedEventObject {
  eventAddress: string;
}
export type EventCreatedEvent = TypedEvent<[string], EventCreatedEventObject>;

export type EventCreatedEventFilter = TypedEventFilter<EventCreatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface EventManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EventManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _address(overrides?: CallOverrides): Promise<[string]>;

    checkInTicket(
      eventAddress: string,
      tokenId: BigNumberish,
      ticketOwner: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createEvent(
      owner: string,
      eventName: string,
      eventDescription: string,
      price: BigNumberish,
      tokenSymbol: string,
      totalSupply: BigNumberish,
      baseURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getEvent(
      eventAddress: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getEvents(overrides?: CallOverrides): Promise<[string[]]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _address(overrides?: CallOverrides): Promise<string>;

  checkInTicket(
    eventAddress: string,
    tokenId: BigNumberish,
    ticketOwner: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createEvent(
    owner: string,
    eventName: string,
    eventDescription: string,
    price: BigNumberish,
    tokenSymbol: string,
    totalSupply: BigNumberish,
    baseURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getEvent(eventAddress: string, overrides?: CallOverrides): Promise<string>;

  getEvents(overrides?: CallOverrides): Promise<string[]>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _address(overrides?: CallOverrides): Promise<string>;

    checkInTicket(
      eventAddress: string,
      tokenId: BigNumberish,
      ticketOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    createEvent(
      owner: string,
      eventName: string,
      eventDescription: string,
      price: BigNumberish,
      tokenSymbol: string,
      totalSupply: BigNumberish,
      baseURI: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getEvent(eventAddress: string, overrides?: CallOverrides): Promise<string>;

    getEvents(overrides?: CallOverrides): Promise<string[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "EventCreated(address)"(
      eventAddress?: string | null
    ): EventCreatedEventFilter;
    EventCreated(eventAddress?: string | null): EventCreatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    _address(overrides?: CallOverrides): Promise<BigNumber>;

    checkInTicket(
      eventAddress: string,
      tokenId: BigNumberish,
      ticketOwner: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createEvent(
      owner: string,
      eventName: string,
      eventDescription: string,
      price: BigNumberish,
      tokenSymbol: string,
      totalSupply: BigNumberish,
      baseURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getEvent(
      eventAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEvents(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _address(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    checkInTicket(
      eventAddress: string,
      tokenId: BigNumberish,
      ticketOwner: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createEvent(
      owner: string,
      eventName: string,
      eventDescription: string,
      price: BigNumberish,
      tokenSymbol: string,
      totalSupply: BigNumberish,
      baseURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getEvent(
      eventAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEvents(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
