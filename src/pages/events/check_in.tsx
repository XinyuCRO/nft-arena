import { useEffect, useState } from 'react';
// import { QrReader } from 'react-qr-reader';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useEventManagerContract } from '../../hooks/useEventManagerContract';
import { ArenaEvent } from '../../tsTypes';
import { useWeb3React } from '@web3-react/core';

const QrReader = dynamic(async () => {
  const a = await import('react-qr-reader')
  console.log(a);
  return a.QrReader;
}, { ssr: false })

interface QRContent {
  event: string;
  ticketId: number;
  owner: string;
  signature: string;
}

const CheckIn = () => {
  const [data, setData] = useState('No result');
  const router = useRouter()
  const [scanData, setScanData] = useState<QRContent>()
  const [eventMeta, setEventMeta] = useState<ArenaEvent>()
  const [txHash, setTxHash] = useState('');
  const { account } = useWeb3React();

  const { fetchEvent, checkIn } = useEventManagerContract()

  useEffect(() => {

    if (!scanData) {
      return;
    }

    fetchEvent(scanData.event).then((meta) => {
      setEventMeta(meta);
    });

  }, [scanData])

  return <div className='flex flex-col items-center justify-center'>
    {
      txHash && <div className="shadow-lg alert alert-success">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Check in success!</span>
        </div>
      </div>
    }
    {
      scanData && eventMeta && <div className="visible opacity-100 pointer-events-auto modal">
        <div className="modal-box">
          <div className="text-xl">{eventMeta.name}</div>
          <p>{eventMeta.description}</p>
          <p>No. {scanData.ticketId}</p>
          <p>Owner: {scanData.owner}</p>
          <div className="modal-action">
            <a href="#" className="btn btn-primary" onClick={() => {
              checkIn({
                event: scanData.event,
                tokenId: scanData.ticketId,
                owner: account,
              }).then((tx) => {
                setTxHash(tx);
                setScanData(undefined)
                setEventMeta(undefined)
              })
            }}>Check In</a>
            <a href="#" className="btn" onClick={() => {
              setScanData(undefined)
              setEventMeta(undefined)
            }}>Close</a>
          </div>
        </div>
      </div>
    }
    <>
      <QrReader
        constraints={{}}
        scanDelay={300}
        onResult={(result) => {
          if (result && result.getText().length > 0) {
            console.log(result);
            setScanData(JSON.parse(result.getText()))
          }
        }}
        className="w-[500px] h-[500px]"
      />
      <p>{data}</p>
    </>
    <div className='m-10'>
      <button className="text-black bg-white btn hover:bg-secondary hover:text-white">Scan QR Code</button>
    </div>
  </div>
}

export default CheckIn;
