import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEventManagerContract } from "../../hooks/useEventManagerContract";
import Image from 'next/image';
import { ArenaEvent } from "../../tsTypes";
import { ArenaEvent__factory, EventManager, EventManager__factory } from "../../types";

const EventsPage = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const { events, isOwner, fetchEvents } = useEventManagerContract();

  useEffect(() => {
    if (!account || !library) {
      return;
    }
    fetchEvents();
  }, [account, library])

  return <div className="mt-5 text-white">
    {
      isOwner && <Link href={`/events/create`}>
        <div className="flex justify-end w-full">
          <button className="align-bottom bg-white btn text-primary hover:bg-secondary hover:text-white">Create Event</button>
        </div>
      </Link>
    }
    <div className="flex flex-col items-center mt-10 lg:grid lg:grid-cols-3 lg:gap-4">
      {events.map((event) => {
        return <div key={event.address} className="w-[300px] mb-10 text-gray-800 shadow-xl card bg-base-100">
          <figure><Image width={300} height={300} objectFit='contain' src={event.coverURL} alt="cover" /></figure>
          <div className="card-body">
            <h2 className="card-title">{event.name}</h2>
            <p>{event.description}</p>
            <p>{ethers.utils.formatEther(event.price)} CRO</p>
            <p>Total {event.totalSupply.toString()}</p>
            <div className="justify-end card-actions">
              <Link href={`/events/${event.address}`}>
                <button className="btn btn-primary hover:bg-secondary">Order Now</button>
              </Link>
            </div>
          </div>
        </div>
      })}
    </div>
  </div>
}

export default EventsPage;
