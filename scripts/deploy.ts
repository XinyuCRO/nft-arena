// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
import hre, { ethers } from "hardhat";

async function main() {

  const [owner] = await hre.ethers.getSigners()

  const EventManager = await hre.ethers.getContractFactory("EventManager");
  const eventManager = await EventManager.connect(owner).deploy()
  await eventManager.deployed();
  console.log("eventManager deployed to:", eventManager.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
