import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { fetchAllAdmins, fetchAllCounties, updateAdmin } from '../../util/fetchFunctions'
import { useRouter } from 'next/router'
import { checkAuth, checkAdmin } from '../../util/helperFunctions'

import Navbar from '../../components/Admin/Navbar'
import Loading from '../../components/Admin/Error/Loading'
import NotSignedIn from '../../components/Admin/Error/NotSignedIn'
import NotAuthed from '../../components/Admin/Error/NotAuthed'
import AccountTable from '../../components/Admin/Accounts/AccountTable'
import Alert from '../../components/Util/Alert'

export default function Resources(props) {
    const [pageAlert, setPageAlert] = useState(props.alrt)
    const [session, loading] = useSession()
    const router = useRouter()
    const isAuth = checkAuth(session)
    const isAdmin = checkAdmin(session)

    const { counties, accounts } = props


    async function editAccount(data) {
        console.log('Edit account')
        await updateAdmin(data)
            .then(res => {
                console.log(res.type)
                if (res.type === 'Success') router.reload()
                else setPageAlert({ type: res.type, message: res.message })
            })
    }

    async function removeAccount(data) {
        // await deleteResource(data)
        //     .then(res => {
        //         if (res.ok) router.reload()
        //         else setPageAlert({ type: res.type, message: res.message })
        //     })
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
                    {counties && accounts ?
                        <AccountTable
                            accounts={accounts}
                            counties={counties}
                            editAccount={editAccount}
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
    let accounts = null
    let alrt = null

    if (session && isAuth && isAdmin) {
        const countyRes = await fetchAllCounties()
        const adminRes = await fetchAllAdmins()

        countyRes.type === 'Error' ? alrt = { type: countyRes.type, message: countyRes.message } : null
        adminRes.type === 'Error' ? alrt = { type: adminRes.type, message: adminRes.message } : null
        if (countyRes.type === 'Success' && adminRes.type === 'Success') {
            counties = countyRes.data
            accounts = adminRes.data
            alrt = { type: 'Success', message: 'Fetched data successfully.' }
        }
    }

    return {
        props: {
            counties,
            accounts,
            alrt
        }
    }
}
