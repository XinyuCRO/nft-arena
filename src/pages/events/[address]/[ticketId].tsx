import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useEventManagerContract } from '../../../hooks/useEventManagerContract'

interface EventMeta {
  address: string;
  name: string,
  description: string,
  price: ethers.BigNumber,
  totalSupply: ethers.BigNumber,
  isActive: boolean
}

const Ticket = () => {
  const router = useRouter()
  const { address, ticketId } = router.query
  const { fetchEvent, buyTicket } = useEventManagerContract()
  const { library } = useWeb3React();

  const [tokenId, setTokenId] = useState(undefined);
  const [event, setEvent] = useState<EventMeta>();

  useEffect(() => {
    if (!address || typeof address === 'object') {
      return;
    }

    fetchEvent(address).then((meta) => {
      if (!meta) {
        return;
      }
      setEvent({
        address,
        name: meta[0],
        description: meta[1],
        price: meta[2],
        totalSupply: meta[3],
        isActive: meta[4]
      })
    })

  }, [address, library])

  if (!event || !event.name) {
    return <div />
  }

  return <div className='flex flex-col items-center justify-center'>
    <div className="w-[500px] mt-10 shadow-xl card card-side bg-base-100">
      <figure><img src="https://api.lorem.space/image/movie?w=200&h=200" alt="Movie" /></figure>
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p>{event.description}</p>
        <div className='flex'>
          <p>ID: {ticketId}</p>
        </div>
      </div>
    </div>
  </div>
}

export default Ticket
