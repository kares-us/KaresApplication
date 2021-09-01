import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import fetchHelper from '../../util/fetchHelper'

import Navbar from '../../components/Admin/Navbar'
import Loading from '../../components/Admin/Error/Loading'
import NotSignedIn from '../../components/Admin/Error/NotSignedIn'
import CountyTable from '../../components/Admin/County/CountyTable'
import Alert from '../../components/Util/Alert'

export default function counties(props) {
    const [session, loading] = useSession()
    const [pageAlert, setPageAlert] = useState(props.alrt)
    const router = useRouter()

    const { counties } = props

    async function addCounty(data) {
        const res = await fetchHelper('/api/county/create', "POST", data)
        const json = await res.json()
        if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
        else router.reload()
    }

    async function updateCounty(id, data) {
        const res = await fetchHelper(`/api/county/update/${id}`, "PATCH", data)
        const json = await res.json()
        if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
        else router.reload()
    }

    if (loading) return <Loading />
    else if (session && counties) return (
        <div className='w-full min-h-screen bg-gray-800'>
            <Navbar session={session} />
            {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
            {counties ? <CountyTable counties={counties} addCounty={addCounty} updateCounty={updateCounty} /> : null}
        </div>
    )
}


export async function getServerSideProps(context) {
    const session = await getSession(context)
    let counties = null
    let alrt = null

    if (!session) return { redirect: { destination: '/api/auth/signin' } }
    if (!session.user.roles.includes("Admin")) return { redirect: { destination: '/admin' } }

    let res = await fetchHelper('/api/county', "GET")
    let json = await res.json()

    if (!res.ok) alrt = { type: "Error", message: json.message }
    else counties = json.data

    return {
        props: {
            counties,
            alrt
        }
    }
}