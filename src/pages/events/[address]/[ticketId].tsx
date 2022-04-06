import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useEventManagerContract } from '../../../hooks/useEventManagerContract'
import { ArenaEvent } from '../../../tsTypes'
import QRCode from "react-qr-code";

interface QRContent {
  event: string;
  ticketId: number;
  owner: string;
  signature: string;
}

const Ticket = () => {
  const router = useRouter()
  const { address, ticketId } = router.query
  const { fetchEvent, buyTicket, getSignedSignature } = useEventManagerContract()
  const { library, account } = useWeb3React();

  const [tokenId, setTokenId] = useState(undefined);
  const [event, setEvent] = useState<ArenaEvent>();

  const [qrValue, setQRValue] = useState('');

  useEffect(() => {
    if (!address || typeof address === 'object') {
      return;
    }

    fetchEvent(address).then((meta) => {
      if (!meta) {
        return;
      }
      setEvent(meta);
    })

  }, [address, library])

  if (!event || !event.name || typeof ticketId === 'object') {
    return <div />
  }

  return <div className='flex flex-col items-center justify-center bg-white'>
    <div className="mt-10 shadow-xl card card-side bg-base-100">
      <figure><Image width={300} height={300} objectFit='contain' src={event.coverURL} alt="cover" /></figure>
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p>{event.description}</p>
        <div className='flex'>
          <p>ID: {ticketId}</p>
        </div>
      </div>
    </div>
    {
      qrValue && <QRCode className='m-10 mt-10 bg-white' value={qrValue} />
    }
    <div className='m-10 bg-white'>
      <button className="text-black bg-white btn hover:bg-secondary hover:text-white" onClick={() => {
        getSignedSignature({ eventAddress: event.address, tokenId: Number(ticketId) }).then((signature) => {

          const content: QRContent = {
            owner: account,
            event: event.address,
            ticketId: Number(ticketId),
            signature: signature
          }
          setQRValue(JSON.stringify(content));
        });
      }}>Show QR Code</button>
    </div>
  </div>
}

export default Ticket
