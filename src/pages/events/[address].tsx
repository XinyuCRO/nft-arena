import { useRouter } from 'next/router'

const Event = () => {
  const router = useRouter()
  const { address } = router.query

  return <p>Event: {address}</p>
}

export default Event
