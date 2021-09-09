import { useSession, getSession } from 'next-auth/client'
import { useState } from 'react'

import Loading from '../../components/Admin/Error/Loading'
import NotSignedIn from '../../components/Admin/Error/NotSignedIn'
import Navbar from '../../components/Admin/Navbar'
import Footer from '../../components/Homepage/Design/Footer'
import AdminIndexCard from '../../components/Util/AdminIndexCard'
import Alert from '../../components/Util/Alert'

export default function Admin(props) {
  const [session, loading] = useSession()
  const [pageAlert, setPageAlert] = useState(props.alrt)

  if (loading) return <Loading />
  else if (!session) return <NotSignedIn />
  else {
    return (
      <div className='w-full min-h-screen bg-gray-800'>
        <Navbar session={session} />
        {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
        <p className='text-white text-2xl p-5 font-semibold text-center'>Welcome back, {session.user.name}.</p>
        <div className='flex flex-wrap m-2 max-w-4xl mx-auto justify-center mb-16'>
          {session.user.roles.includes('County Manager') || session.user.roles.includes('Admin') ? <AdminIndexCard title='Visitors' description='View visitors information across counties you manage.' route='/admin/visitors' /> : null}
          {session.user.roles.includes('Admin') ? <AdminIndexCard title='Resources' description='Access county resources and information.' route='/admin/resources' /> : null}
          {session.user.roles.includes('Admin') ? <AdminIndexCard title='Counties' description='Create and edit county information.' route='/admin/counties' /> : null}
          {session.user.roles.includes('Admin') ? <AdminIndexCard title='Admins' description='Access admins registered with Kares.' route='/admin/accounts' /> : null}
          {session.user.roles.length <= 0 ? <p className='text-white text-center'>You do not have any assigned roles to your account. Contact a KARES admin if you believe this is a mistake.</p> : null}
        </div>
        <Footer />
      </div>
    )
  }
}