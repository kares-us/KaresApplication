import { useState } from "react"
import fetchHelper from "../util/fetchHelper"

import SimpleForm from "../components/Homepage/Modals/SimpleForm"
import AdvancedForm from '../components/Homepage/Modals/AdvancedForm'
import Alert from "../components/Util/Alert"
import Footer from "../components/Homepage/Design/Footer"
import Header from "../components/Homepage/Design/Header"

export default function Home(props) {
    const { counties, alrt } = props
    const [pageAlert, setPageAlert] = useState(alrt)
    const [simpleForm, setSimpleForm] = useState(false)
    const [advancedForm, setAdvancedForm] = useState(false)


    return (
        <div className=''>
            <Header />
            {simpleForm ? <SimpleForm handleForm={setSimpleForm} counties={counties} setPageAlert={setPageAlert} /> : null}
            {advancedForm ? <AdvancedForm handleForm={setAdvancedForm} counties={counties} setPageAlert={setPageAlert} /> : null}

            {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
            <div className='h-screen flex flex-col'>
                <div className='h-1/2'>
                    <div style={{ backgroundImage: "url(/img/hometop.jpg)" }} className='h-full w-full bg-cover bg-center flex justify-center items-center'>
                        <div className='bg-white bg-opacity-75 w-10/12 max-w-sm h-4/5 rounded-full flex flex-col justify-center items-center hover:bg-blue-100 cursor-pointer transition-all' onClick={() => setSimpleForm(!simpleForm)}>
                            <p className='text-3xl'>Explore</p>
                            <img src='/img/Kares_Logo.png' className='w-32 h-auto my-3' />
                            <p className='text-3xl'>In your community</p>
                        </div>
                    </div>
                </div>
                <div className='h-1/2'>
                    <div style={{ backgroundImage: "url(/img/homebottom.jpg)" }} className='h-full w-full bg-cover bg-center flex justify-center items-center'>
                        <div className='bg-white bg-opacity-75 w-10/12 max-w-sm h-4/5 rounded-full flex flex-col justify-center items-center hover:bg-blue-100 cursor-pointer transition-all' onClick={() => setAdvancedForm(!advancedForm)}>
                            <p className='text-3xl'>Request</p>
                            <img src='/img/Kares_Logo.png' className='w-32 h-auto my-3' />
                            <p className='text-3xl'>Assistance</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export async function getServerSideProps(context) {
    let counties
    let alrt = null


    let res = await fetchHelper('/county', "GET")
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