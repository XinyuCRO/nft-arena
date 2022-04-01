import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useEventManagerContract } from '../../../hooks/useEventManagerContract'
import { ArenaEvent } from '../../../tsTypes'

const Event = () => {
  const router = useRouter()
  const { address } = router.query
  const { fetchEvent, buyTicket } = useEventManagerContract()
  const { library } = useWeb3React();

  const [tokenId, setTokenId] = useState<number>(undefined);

  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const [event, setEvent] = useState<ArenaEvent>();

  useEffect(() => {
    if (!address || typeof address === 'object') {
      return;
    }

    fetchEvent(address).then((meta) => {
      if (!meta) {
        return;
      }
      setEvent({
        ...meta
      })
    })

  }, [address, library])

  if (!event || !event.name) {
    return <div />
  }

  return <div className='flex flex-col items-center justify-center'>
    {
      tokenId !== undefined &&
      <div className="shadow-lg alert alert-success">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Ticket Bought!</span>
          <Link href={`/events/${event.address}/${tokenId}`}>
            <button type="button">Check Detail</button>
          </Link>
        </div>
      </div>
    }
    <div className="w-[500px] mt-10 shadow-xl card card-side bg-base-100">
      <figure><Image src={event.coverURL} alt="Cover" /></figure>
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p>{event.description}</p>
        <div className='flex'>
          <p>{ethers.utils.formatEther(event.price)} CRO</p>
          <p>Total {event.totalSupply.toString()}</p>
        </div>
      </div>
    </div>
    <div className='flex mt-10'>
      <div className='grid grid-cols-10 gap-3'>
        {
          [...Array(Number(event.totalSupply.toString())).keys()].map((_, index) => {
            return <div key={index} className="cursor-pointer" onClick={() => {
              setSelectedIndex(index)
            }}>
              {
                selectedIndex === index ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              }
            </div>
          })
        }
      </div>
      <div className='flex flex-col ml-40'>
        {
          selectedIndex !== undefined && <div className='self-center text-white'>You have selected seat {selectedIndex}, total {ethers.utils.formatEther(event.price)}  CRO</div>
        }
        <button className="mt-20 align-bottom bg-white btn text-primary hover:bg-secondary hover:text-white" onClick={() => {

          buyTicket({
            tokenId: selectedIndex,
            eventAddress: event.address,
            price: event.price
          }).then((tokenId) => {
            setTokenId(tokenId);
          })

        }}>Checkout</button>
      </div>
    </div>
  </div>
}

export default Event
