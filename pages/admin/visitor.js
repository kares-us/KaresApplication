import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { fetchAdminCounty, fetchAllCounties } from '../../util/fetchFunctions'
import { checkAdmin, checkAuth } from '../../util/helperFunctions'

import Navbar from '../../components/Admin/Navbar'
import Loading from '../../components/Admin/Error/Loading'
import NotSignedIn from '../../components/Admin/Error/NotSignedIn'
import NotAuthed from '../../components/Admin/Error/NotAuthed'
import VisitorTable from '../../components/Admin/Visitor/VisitorTable'
import Alert from '../../components/Util/Alert'

export default function Visitor(props) {
    const [pageAlert, setPageAlert] = useState(props.alrt)
    const [session, loading] = useSession()
    const isAuth = checkAuth(session)

    const { counties } = props
    
    function renderPage() {
        if (loading) return <Loading />
        else if (!session) return <NotSignedIn />
        else if (session && !loading && !isAuth) return <NotAuthed />
        else if (session && !loading && isAuth) {
            return (
                <div className='w-full min-h-screen bg-gray-800'>
                    <Navbar session={session} />
                    {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
                    {counties ?
                        <VisitorTable
                            counties={counties}
                            setPageAlert={setPageAlert}
                            session={session}
                        />
                        :
                        null
                    }

                </div>
            )
        }
    }

    return (
        renderPage()
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const isAuth = checkAuth(session)
    const isAdmin = checkAdmin(session)


    let counties = null
    let alrt = null

    if (session && isAuth) {
        const res = isAdmin ? await fetchAllCounties() : await fetchAdminCounty(session)

        if (res.type === 'Error') {
            alrt = { type: res.type, message: res.message }
        }
        else {
            counties = res.data
            alrt = { type: res.type, message: res.message }
        }
    }

    return {
        props: {
            counties,
            alrt
        }
    }
}