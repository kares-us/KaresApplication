import { checkAdmin } from "../../util/helperFunctions"
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'

export default function Navbar(props) {
    const isAdmin = checkAdmin(props.session)
    const router = useRouter()

    return (
        <div className='h-16 w-full bg-gray-700 flex justify-between items-center p-4'>
            <button className='text-gray-100 text-xl' onClick={() => router.push('/admin')}>Kares Console</button>
            <div>
                <button className='mx-4 text-gray-400 hover:text-gray-300 transition-all' onClick={() => router.push('/admin/visitor')}>Visitors</button>
                {isAdmin ? <button onClick={() => router.push('/admin/resources')} className='mx-4 text-gray-400 hover:text-gray-300 transition-all'>Resources</button> : null}
                {isAdmin ? <button onClick={() => router.push('/admin/counties')} className='mx-4 text-gray-400 hover:text-gray-300 transition-all'>Counties</button> : null}
                {isAdmin ? <button onClick={() => router.push('/admin/accounts')} className='mx-4 text-gray-400 hover:text-gray-300 transition-all'>Accounts</button> : null}
                <button className='mx-4 text-gray-400 hover:text-gray-300 transition-all' onClick={() => signOut({ callbackUrl: '/admin/signin' })}>Sign Out</button>
            </div>
        </div>
    )
}
