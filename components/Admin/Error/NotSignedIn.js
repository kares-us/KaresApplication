import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function NotSignedIn() {
    const router = useRouter()
    return (
        <div className='flex flex-col justify-center items-center h-screen flex-col bg-gray-800'>
            <p className='mb-5 text-gray-300 text-xl'>You must be signed in to view this page.</p>
            <button
                className='mb-5 px-16 p-3 border-2 border-blue-500 text-lg font-normal bg-blue-300 hover:bg-blue-400 hover:border-blue-600 transition-all'
                onClick={() => signIn()}
            >
                Sign In
            </button>
            <button
                onClick={() => router.push('https://kares.us/')}
                className='px-16 p-3 border-2 border-blue-500 text-lg font-normal bg-blue-300 hover:bg-blue-400 hover:border-blue-600 transition-all'
            >
                Back to Homepage
            </button>
        </div>
    )
}