import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import fetchHelper from '../../util/fetchHelper'

import Navbar from '../../components/Admin/Navbar'
import Loading from '../../components/Admin/Error/Loading'
import NotSignedIn from '../../components/Admin/Error/NotSignedIn'
import ResourceTable from '../../components/Admin/Resource/ResourceTable'
import Alert from '../../components/Util/Alert'

export default function Resources(props) {
    const { counties } = props
    const [pageAlert, setPageAlert] = useState(props.alrt)
    const [session, loading] = useSession()
    const router = useRouter()

    async function getCountyResources(id) {
        const res = await fetchHelper(`/api/resource/county/${id}`, "GET")
        const json = await res.json()
        if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
        else return json
    }
    async function createCountyResource(data) {
        const res = await fetchHelper(`/api/resource/create`, "POST", data)
        const json = await res.json()
        if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
        else router.reload()
    }
    async function updateCountyResource(id, data) {
        const res = await fetchHelper(`/api/resource/update/${id}`, "PATCH", data)
        const json = await res.json()
        if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
        else router.reload()
    }
    async function deleteCountyResource(id) {
        const res = await fetchHelper(`/api/resource/delete/${id}`, "DELETE")
        const json = await res.json()
        if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
        else router.reload()
    }


    if (loading) return <Loading />
    else if (session && counties) return (
        <div className='w-full min-h-screen bg-gray-800'>
            <Navbar session={session} />
            {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
            {counties.length > 0 ?
                <ResourceTable
                    counties={counties}
                    functions={{ getCountyResources, createCountyResource, updateCountyResource, deleteCountyResource }}
                />
                :
                <p className='mt-5 text-center text-white'>There are currently no counties tied to your account.</p>
            }
        </div>
    )
}


export async function getServerSideProps(context) {
    const session = await getSession(context)
    let counties = null

    if (!session) return { redirect: { destination: '/api/auth/signin' } }
    if (!session.user.roles.includes("Admin")) return { redirect: { destination: '/admin' } }

    let resCounties = await fetchHelper('/api/county', "GET")
    let jsonCounties = await resCounties.json()

    if (!resCounties.ok) alrt = { type: "Error", message: jsonCounties.message }
    else counties = jsonCounties.data

    return {
        props: {
            counties
        }
    }
}
