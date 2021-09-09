import { useState } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import Sidebar from './Sidebar'

export default function Navbar(props) {
  const isAdmin = props.session.user.roles.includes('Admin')
  const isCountyManager = props.session.user.roles.includes('County Manager')

  const [sidebar, setSidebar] = useState(false)
  const router = useRouter()

  return (
    <div className='h-16 w-full bg-gray-700 flex justify-between items-center p-4'>
      <button className='text-gray-100 text-xl' onClick={() => router.push('/admin')}>Kares Console</button>
      <div className='hidden sm:block'>
        {isCountyManager || isAdmin ? <button className='mx-4 text-gray-400 hover:text-gray-300 transition-all' onClick={() => router.push('/admin/visitors')}>Visitors</button> : null}
        {isAdmin ? <button onClick={() => router.push('/admin/resources')} className='mx-4 text-gray-400 hover:text-gray-300 transition-all'>Resources</button> : null}
        {isAdmin ? <button onClick={() => router.push('/admin/counties')} className='mx-4 text-gray-400 hover:text-gray-300 transition-all'>Counties</button> : null}
        {isAdmin ? <button onClick={() => router.push('/admin/accounts')} className='mx-4 text-gray-400 hover:text-gray-300 transition-all'>Accounts</button> : null}
        <button className='mx-4 text-gray-400 hover:text-gray-300 transition-all' onClick={() => signOut({ callbackUrl: '/admin/signin' })}>Sign Out</button>
      </div>
      <div className='sm:hidden '>
        <button className='h-10 w-10 border shadow-md rounded-lg bg-gray-400 flex justify-center items-center hover:bg-gray-500 transition-all' onClick={() => setSidebar(!sidebar)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* {sidebar ? <Sidebar open={sidebar} session={props.session} onClick={() => setSidebar(!sidebar)} /> : null} */}
      <Sidebar open={sidebar} session={props.session} onClick={() => setSidebar(!sidebar)} />
    </div>
  )
}
