import { useRouter } from "next/router"

export default function Footer() {
    const router = useRouter()

    return (
        <div className='h-16 flex justify-between py-1 px-3 shadow-lg bg-gray-600'>
            <img src={'/img/Cumberlands.png'} className='sm:block hidden h-full w-auto' />
            <p className='text-sm font-medium text-gray-300 my-auto'>© Copyright 2021, Daddy Jack</p>
            <img src={'/img/DaddyJackPart.png'} className='h-full w-auto' onClick={() => router.push('/admin')} />
        </div>
    )
}