import { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import fetchHelper from '../../util/fetchHelper'

import Navbar from '../../components/Admin/Navbar'
import Loading from '../../components/Admin/Error/Loading'
import VisitorTable from '../../components/Admin/Visitor/VisitorTable'
import Alert from '../../components/Util/Alert'
import Footer from '../../components/Homepage/Design/Footer'

export default function Visitor(props) {
  const { counties } = props
  const [pageAlert, setPageAlert] = useState(props.alrt)
  const [session, loading] = useSession()
  const router = useRouter()


  async function getVisitorsByCounty(id) {
    let res = await fetchHelper(`/visitor/county/${id}`, "GET")
    let json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else return json
  }

  async function markVisitorFulfilled(id) {
    let res = await fetchHelper(`/visitor/mark_fulfilled/${id}`, "POST")
    let json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else router.reload()
  }

  async function markVisitorArchived(id) {
    let res = await fetchHelper(`/visitor/mark_archived/${id}`, "POST")
    let json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else router.reload()
  }

  async function deleteVisitor(id) {
    let res = await fetchHelper(`/visitor/delete/${id}`, "DELETE")
    let json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else router.reload()
  }




  if (loading) return <Loading />
  else if (session && counties) return (
    <div className='w-full min-h-screen bg-gray-800'>
      <Navbar session={session} />
      {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
      {counties.length > 0 ?
        <VisitorTable
          counties={counties}
          functions={{ getVisitorsByCounty, markVisitorArchived, markVisitorFulfilled, deleteVisitor }}
        />
        :
        <p className='mt-5 text-center text-white'>There are currently no counties tied to your account.</p>
      }
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  if (!session.user.roles.includes("County Manager")) return { redirect: { destination: '/admin' } }
  else if (session.user.roles.includes("Admin")) {
    let counties = null
    let resCounties = await fetchHelper('/county', "GET")
    let jsonCounties = await resCounties.json()

    if (!resCounties.ok) alrt = { type: "Error", message: jsonCounties.message }
    else counties = jsonCounties.data

    console.log(counties)

    return {
      props: {
        counties: session.user.counties
      }
    }
  }
  else if (session.user.roles.includes("County Manager")) return { props: { counties: session.user.counties } }

}