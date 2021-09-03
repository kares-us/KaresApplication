import { useRouter } from "next/router"

export default function Footer() {
    const router = useRouter()

    return (
        <div className='h-16 fixed bottom-0 w-full flex justify-between py-1 px-3 shadow-lg' style={{ backgroundColor: '#1d4e56' }}>
            <img src={'/img/Cumberlands.png'} className='sm:block hidden h-full w-auto' />
            <p className='text-sm font-medium text-gray-300 my-auto'>© Copyright 2021, Daddy Jack</p>
            <img src={'/img/DaddyJackPart.png'} className='h-full w-auto' onClick={() => router.push('/admin')} />
        </div>
    )
}
