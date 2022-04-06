import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useEventManagerContract } from "../../hooks/useEventManagerContract";
import { ArenaEvent } from "../../tsTypes";
import { ArenaEvent__factory } from "../../types";

interface TicketsInfo {
  event: string;
  eventMeta: ArenaEvent;
  ticketId: number;
  hasCheckedIn: boolean;
}

const EventsPage = () => {

  const { account, library } = useWeb3React<Web3Provider>()

  const { eventManager, fetchEvent } = useEventManagerContract()
  const [tickets, setTickets] = useState<TicketsInfo[]>([]);

  useEffect(() => {

    if (!account || !library) {
      return
    }

    const f = async () => {

      const eventsAddress = await eventManager.getEvents()

      const events = await Promise.all(eventsAddress.map(async (address) => {
        return ArenaEvent__factory.connect(address, library.getSigner())
      }))

      const soldTokens = (await Promise.all(
        events.map(async (e) => {
          const boughtTickets = await e.getTickets()
          const meta = await fetchEvent(e.address)
          console.log(boughtTickets);


          return boughtTickets.map(id => {
            return {
              event: e.address,
              eventMeta: meta,
              ticketId: id[0].toNumber(),
              hasCheckedIn: id[1]
            }
          })
        })
      )).flat();

      setTickets(soldTokens);
    }

    f();
  }, [account, library])


  return <div className="text-white">
    <div className="flex flex-col items-center mt-10 lg:grid lg:grid-cols-3 lg:gap-4">
      {tickets.map((t) => {
        return <div key={`${t.event}${t.ticketId}`} className="w-[300px] text-gray-800 shadow-xl card card-compact bg-base-100 mb-10">
          <figure><Image width={300} height={300} objectFit='contain' src={t.eventMeta.coverURL} alt="cover" /></figure>
          <div className="card-body">
            {
              t.hasCheckedIn ? <h2 className="text-2xl line-through card-tile">{t.eventMeta.name}</h2> : <h2 className="card-title">{t.eventMeta.name}</h2>
            }
            <p>{t.eventMeta.description}</p>
            <p>{ethers.utils.formatEther(t.eventMeta.price)} CRO</p>
            <p>No. {t.ticketId}</p>
            <div className="justify-end card-actions">
              <Link href={`/events/${t.eventMeta.address}/${t.ticketId}`}>
                <button className="btn btn-primary hover:bg-secondary">Check Detail</button>
              </Link>
              <Link href={`/events/${t.eventMeta.address}`}>
                <button className="btn btn-primary hover:bg-secondary">Goto Event</button>
              </Link>
            </div>
          </div>
        </div>
      })}
    </div></div>
}

export default EventsPage;
