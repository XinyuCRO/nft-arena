import { ethers } from "ethers";

export interface ArenaEvent {
  address: string;
  name: string;
  description: string;
  price: ethers.BigNumberish;
  totalSupply: ethers.BigNumberish;
  isActive: boolean;
  coverURL: string;
}
