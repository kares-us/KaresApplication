import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'

export default function notAuthed() {
    const router = useRouter()

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-800'>
            <p className='text-2xl text-gray-200 mb-5'>You are not authorized to view this page.</p>
            <button
                onClick={() => router.push('/')}
                className='px-16 p-3 border-2 border-blue-500 text-lg font-normal bg-blue-300 hover:bg-blue-400 hover:border-blue-600 transition-all mb-3'
            >
                Back to Homepage
            </button>
            <button
                onClick={() => signOut({ callbackUrl: '/admin/signin' })}
                className='px-16 p-3 border-2 border-blue-500 text-lg font-normal bg-blue-300 hover:bg-blue-400 hover:border-blue-600 transition-all'
            >
                Sign Out
            </button>
        </div>
    )
}