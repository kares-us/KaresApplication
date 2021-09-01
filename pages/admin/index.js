import { useSession, getSession } from 'next-auth/client'
import { useState } from 'react'

import Loading from '../../components/Admin/Error/Loading'
import NotSignedIn from '../../components/Admin/Error/NotSignedIn'
import Navbar from '../../components/Admin/Navbar'
import Alert from '../../components/Util/Alert'

export default function Admin(props) {
    const { counties, alrt } = props
    const [session, loading] = useSession()
    const [pageAlert, setPageAlert] = useState(props.alrt)

    if (loading) return <Loading />
    else if (!session) return <NotSignedIn />
    else {
        return (
            <div className='w-full min-h-screen bg-gray-800'>
                <Navbar session={session} />
                {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
            </div>
        )
    }
}


export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) return { redirect: { destination: '/api/auth/signin' } }

    return {
        props: {
            counties: session.user.counties
        }
    }
}