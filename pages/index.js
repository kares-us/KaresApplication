import { useState } from "react"
import { fetchAllCounties } from "../util/fetchFunctions"

import SimpleForm from "../components/Homepage/SimpleForm"
import AdvancedForm from '../components/Homepage/AdvancedForm'
import Alert from "../components/Util/Alert"
import Footer from "../components/Homepage/Footer"
import Header from "../components/Homepage/Header"

export default function Home(props) {
    const { counties } = props
    const [pageAlert, setPageAlert] = useState(props.alrt)
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
    const res = await fetchAllCounties()

    if (res.type === 'Error') {
        alrt = { type: res.type, message: res.message }
    }
    else {
        counties = res.data
    }

    return {
        props: {
            counties,
            alrt
        }
    }
}