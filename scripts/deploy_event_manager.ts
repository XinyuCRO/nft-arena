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


  let createdEvent = await eventManager.connect(owner).createEvent(
    owner.address,
    "some event name",
    "event description",
    10000000,
    "TTT",
    100,
    "https://cdn.lorem.space/images/movie/.cache/500x0/godzilla-kong.jpg",
  )

  await createdEvent.wait()
  console.log("event created");

  createdEvent = await eventManager.connect(owner).createEvent(

    owner.address,
    "Some Event",
    "Will happen pretty soon",
    100000000000000,
    "TTT",
    100,
    "https://cdn.lorem.space/images/movie/.cache/500x0/godzilla-kong.jpg",
  )

  await createdEvent.wait()
  console.log("event created");

  createdEvent = await eventManager.connect(owner).createEvent(
    owner.address,
    "Event with a very long name",
    "Some description",
    100000000000000,
    "TTT",
    100,
    "https://cdn.lorem.space/images/movie/.cache/500x0/godzilla-kong.jpg",
  )

  await createdEvent.wait()
  console.log("event created");

  const events = await eventManager.connect(owner).getEvents()
  console.log(events);

  const Event = await hre.ethers.getContractFactory("ArenaEvent");
  for (let i = 0; i < events.length; i++) {
    const eventContract = Event.connect(owner).attach(events[i]);

    const _owner = await eventContract.owner()
    console.log(_owner);

    await eventContract.buyTicket({
      value: 10000000
    });
    await createdEvent.wait();

    await eventContract.buySpecifiedTicket(23, {
      value: 10000000
    });
    await createdEvent.wait();

    const tickets = await eventContract.getTickets()
    console.log(`Bought ticket: ${tickets}`);

    const hash = await eventContract.getMessageHash(23);
    console.log(`MessageHash: ${hash}`)

    const checkInResult = await eventContract.checkInTicket(23, owner.address);
    await checkInResult.wait()
    console.log(checkInResult)

    const tickets1 = await eventContract.getTickets()
    console.log(`Bought ticket: ${tickets1}`);

  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
