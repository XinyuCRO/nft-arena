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
    <div className="flex flex-col mt-10 lg:grid lg:grid-cols-3 lg:gap-4">
      {tickets.map((t) => {
        return <div key={`${t.event}${t.ticketId}`} className="w-[300px] h-[600px] mb-10 text-gray-800 shadow-xl card bg-base-100">
          <figure className="flex-none"><Image width={300} height={300} objectFit='contain' src={t.eventMeta.coverURL} alt="cover" /></figure>
          <div className="flex h-[300px] card-body">
            {
              t.hasCheckedIn ? <h2 className="flex-none text-2xl line-through card-tile">{t.eventMeta.name}</h2> : <h2 className="flex-none card-title">{t.eventMeta.name}</h2>
            }
            <p className="overflow-hidden shrink">{t.eventMeta.description}</p>
            <p className="flex-none">{ethers.utils.formatEther(t.eventMeta.price)} CRO</p>
            <p className="flex-none">No. {t.ticketId}</p>
            <div className="flex flex-row items-center justify-center space-x-2">
              <Link href={`/events/${t.eventMeta.address}/${t.ticketId}`}>
                <button className="btn btn-primary hover:bg-secondary">Check Detail</button>
              </Link>
            </div>
          </div>
        </div>
      })}
    </div></div>
}

export default EventsPage;
