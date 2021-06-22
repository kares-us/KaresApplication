import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { fetchAllCounties, createCounty, editCounty } from '../../util/fetchFunctions'
import { checkAuth, checkAdmin } from '../../util/helperFunctions'
import { useState } from 'react'

import Navbar from '../../components/Admin/Navbar'
import Loading from '../../components/Admin/Error/Loading'
import NotSignedIn from '../../components/Admin/Error/NotSignedIn'
import NotAuthed from '../../components/Admin/Error/NotAuthed'
import CountyTable from '../../components/Admin/County/CountyTable'
import Alert from '../../components/Util/Alert'

export default function counties(props) {
    const [session, loading] = useSession()
    const [pageAlert, setPageAlert] = useState(props.alrt)
    const router = useRouter()
    const isAuth = checkAuth(session)
    const isAdmin = checkAdmin(session)

    const { counties } = props

    async function addCounty(data) {
        const res = await createCounty(data)
        if (res.type === 'Success') router.reload()
        else setPageAlert({ type: res.type, message: res.message })
    }

    async function updateCounty(data) {
        const res = await editCounty(data)
        if (res.type === 'Success') router.reload()
        else setPageAlert({ type: res.type, message: res.message })
    }

    function renderPage() {
        if (loading) return <Loading />
        else if (!session) return <NotSignedIn />
        else if ((session && !loading && !isAuth) || !isAdmin) return <NotAuthed />
        else if (session && !loading && isAuth && isAdmin) {
            return (
                <div className='w-full min-h-screen bg-gray-800'>
                    <Navbar session={session} />
                    {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
                    {counties ?
                        <CountyTable counties={counties} addCounty={addCounty} editCounty={updateCounty} />
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

    if (session && isAdmin && isAuth) {
        const res = await fetchAllCounties()


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