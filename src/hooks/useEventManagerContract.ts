import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArenaEvent } from "../tsTypes";
import { ArenaEvent__factory, EventManager__factory } from "../types";

const contractAddress = "0x998abeb3E57409262aE5b751f60747921B33613E"

export interface CreateEventParams {
  eventName: string, eventDescription: string, price: number, tokenSymbol: string, totalSupply: number,
  coverURI: string,
}

export const useEventManagerContract = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [isOwner, setIsOwner] = useState(false);
  const [events, setEvents] = useState<ArenaEvent[]>([]);

  const eventManager = useMemo(() => {
    if (!account || !library) {
      setIsOwner(false);
      return;
    }

    const eventManager = EventManager__factory.connect(contractAddress, library.getSigner())

    return eventManager;

  }, [account, library])

  const fetchEvents = useCallback(async () => {

    if (!eventManager) {
      return;
    }

    const eventsAddress = await eventManager.getEvents()

    const events = await Promise.all(
      eventsAddress.map(async (event) => {
        const eventManager = ArenaEvent__factory.connect(event, library.getSigner())
        const metaData = await eventManager.getMetaData()
        const e: ArenaEvent = {
          address: event,
          name: metaData[0],
          description: metaData[1],
          price: metaData[2],
          totalSupply: metaData[3],
          isActive: metaData[4],
          coverURL: metaData[5],
        }

        return e
      })
    )

    setEvents(events);


    const contractOwner = await eventManager.owner();
    if (contractOwner === account) {
      setIsOwner(true);
    }
  }, [account, library])


  const createEvent = useCallback(async (props: CreateEventParams) => {
    if (!eventManager) {
      return;
    }

    const tx = await eventManager.createEvent(props.eventName, props.eventDescription, ethers.utils.parseEther(props.price.toString()), props.tokenSymbol, props.totalSupply, props.coverURI)
    const receipt = await tx.wait()
    const address = receipt.events.filter(e => e.event === "EventCreated")[0].args[0]
    return address;
  }, [account, library])

  const fetchEvent = useCallback(async (address: string) => {
    if (!eventManager) {
      return;
    }

    const event = ArenaEvent__factory.connect(address, library.getSigner())
    const metaData = await event.getMetaData()
    return metaData;
  }, [account, library])

  const buyTicket = useCallback(async (props: { eventAddress: string, price: ethers.BigNumber }) => {
    const event = ArenaEvent__factory.connect(props.eventAddress, library.getSigner())
    const tx = await event.buyTicket({
      value: props.price
    })
    const receipt = await tx.wait();
    const tokenId = Number(receipt.events.filter(e => e.event === "TicketBought")[0].args[1]);
    return tokenId
  }, [account, library])

  return {
    events, isOwner, fetchEvents, createEvent, fetchEvent, buyTicket
  }

}
