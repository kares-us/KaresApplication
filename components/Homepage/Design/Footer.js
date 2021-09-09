import { useRouter } from "next/router"

export default function Footer() {
  const router = useRouter()

  return (
    <div className='h-16 fixed bottom-0 w-full flex justify-between py-1 px-3 shadow-lg bg-gray-700'>
      <img src={'/img/Cumberlands.png'} className='h-full w-auto' onClick={() => router.push('/admin')} />
    </div>
  )
}
