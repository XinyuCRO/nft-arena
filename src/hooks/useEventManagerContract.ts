import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArenaEvent } from "../tsTypes";
import { ArenaEvent__factory, EventManager__factory } from "../types";

const contractAddress = "0xCA8c8688914e0F7096c920146cd0Ad85cD7Ae8b9"

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

  useEffect(() => {
    if (!eventManager) {
      return;
    }

    eventManager.owner().then(ownerAddr => {
      setIsOwner(ownerAddr === account);
    })

  }, [eventManager])

  const fetchEvent = useCallback(async (address: string) => {
    if (!eventManager) {
      return;
    }

    const event = ArenaEvent__factory.connect(address, library.getSigner())
    const metaData = await event.getMetaData()
    const soldIds = await event.getSoldTokenIds();

    const detail: ArenaEvent = {
      address: address,
      name: metaData[0],
      description: metaData[1],
      price: metaData[2],
      totalSupply: metaData[3],
      isActive: metaData[4],
      coverURL: metaData[5],
      soldIds: soldIds.map(id => id.toNumber()),
    }

    return detail;
  }, [account, library])

  const fetchEvents = useCallback(async () => {

    if (!eventManager) {
      return;
    }

    const eventsAddress = await eventManager.getEvents()

    const events = await Promise.all(
      eventsAddress.map(async (event) => {
        return fetchEvent(event)
      })
    )

    setEvents(events);

    const contractOwner = await eventManager.owner();
    if (contractOwner === account) {
      setIsOwner(true);
    }

    return events;
  }, [account, library, fetchEvent])


  const createEvent = useCallback(async (props: CreateEventParams) => {
    if (!eventManager) {
      return;
    }

    const tx = await eventManager.createEvent(account, props.eventName, props.eventDescription, ethers.utils.parseEther(props.price.toString()), props.tokenSymbol, props.totalSupply, props.coverURI)
    const receipt = await tx.wait()
    const address = receipt.events.filter(e => e.event === "EventCreated")[0].args[0]
    return address;
  }, [account, library])


  const buyTicket = useCallback(async (props: { eventAddress: string, tokenId: number, price: ethers.BigNumberish }) => {
    const event = ArenaEvent__factory.connect(props.eventAddress, library.getSigner())
    const tx = await event.buySpecifiedTicket(props.tokenId, {
      value: props.price
    })
    const receipt = await tx.wait();
    const tokenId = Number(receipt.events.filter(e => e.event === "TicketBought")[0].args[1]);
    return tokenId
  }, [account, library])

  const getSignedSignature = useCallback(async (props: { eventAddress: string, tokenId: number }) => {
    const event = ArenaEvent__factory.connect(props.eventAddress, library.getSigner());
    const hash = await event.getMessageHash(props.tokenId);

    const signedHash = await library.getSigner().signMessage(hash);
    return signedHash;
  }, [account, library])

  const checkIn = useCallback(async (props: { event: string, tokenId: number, owner: string, sig: string }) => {
    const tx = await eventManager.checkIn(props.owner, props.event, props.tokenId, props.sig);
    await tx.wait()

    return tx.hash;
  }, [account, library])

  return {
    eventManager, events, isOwner, fetchEvents, createEvent, fetchEvent, buyTicket, getSignedSignature, checkIn
  }

}
