import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import fetchHelper from '../../util/fetchHelper'

import Navbar from '../../components/Admin/Navbar'
import Loading from '../../components/Admin/Error/Loading'
import AccountTable from '../../components/Admin/Accounts/AccountTable'
import Alert from '../../components/Util/Alert'
import Footer from '../../components/Homepage/Design/Footer'
import AccountCreation from '../../components/Admin/Accounts/AccountCreation'

export default function Accounts(props) {
  const { counties } = props
  const [pageAlert, setPageAlert] = useState(props.alrt)
  const [session, loading] = useSession()
  const router = useRouter()

  async function createAccount(data) {
    const res = await fetchHelper(`/admin/create`, "POST", data)
    const json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else router.reload()
  }

  async function getAccounts() {
    const res = await fetchHelper(`/admin`, "GET")
    const json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else return json
  }

  async function updateAccount(id, data) {
    const res = await fetchHelper(`/admin/update/${id}`, "PATCH", data)
    const json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else router.reload()
  }

  if (loading) return <Loading />
  else if (session && counties) return (
    <div className='w-full min-h-screen bg-gray-800'>
      <Navbar session={session} />
      {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
      <AccountCreation createAccount={createAccount} />
      {counties ?
        <AccountTable
          counties={counties}
          getAccounts={getAccounts}
          updateAccount={updateAccount}
        />
        :
        null
      }
    </div>
  )

}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  let counties = null
  let accounts = null
  let alrt = null

  if (!session) return { redirect: { destination: '/api/auth/signin' } }

  if (!session.user.roles.includes("Admin")) return { redirect: { destination: '/admin' } }

  let resCounties = await fetchHelper('/county', "GET")
  let jsonCounties = await resCounties.json()

  if (!resCounties.ok) alrt = { type: "Error", message: jsonCounties.message }
  else counties = jsonCounties.data


  return {
    props: {
      counties,
      accounts,
      alrt
    }
  }
}
