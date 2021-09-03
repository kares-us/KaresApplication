import { useState } from "react"
import fetchHelper from "../util/fetchHelper"

import SimpleForm from "../components/Homepage/Modals/SimpleForm"
import RegisterForm from '../components/Homepage/Modals/RegisterForm'
import AdvancedForm from '../components/Homepage/Modals/AdvancedForm'
import Alert from "../components/Util/Alert"
import Footer from "../components/Homepage/Design/Footer"
import Header from "../components/Homepage/Design/Header"

export default function Home(props) {
    const { counties, alrt } = props
    const [pageAlert, setPageAlert] = useState(alrt)
    const [simpleForm, setSimpleForm] = useState(false)
    const [registerForm, setRegisterForm] = useState(false)
    const [advancedForm, setAdvancedForm] = useState(false)


    return (
        <div className='bg-gray-300 min-h-screen flex justify-center items-center flex-wrap' style={{ backgroundImage: "url(/img/hometop.jpg)", }}>
            <Header />
            <img src='/img/ExploreKARES.png' onClick={() => setSimpleForm(!simpleForm)} className='transform cursor-pointer w-96 m-2 my-20 hover:scale-125 transition-all' />
            <img src='/img/RegisterWithKARES.png' onClick={() => setRegisterForm(!registerForm)} className='transform cursor-pointer w-96 m-2 my-20 hover:scale-125 transition-all' />
            <img src='/img/RequestAssistanceKARES.png' onClick={() => setAdvancedForm(!advancedForm)} className='transform cursor-pointer w-96 m-2 my-20 hover:scale-125 transition-all' />
            <Footer />
            {pageAlert ? <Alert type={pageAlert.type} message={pageAlert.message} handleAlert={setPageAlert} /> : null}
            {simpleForm ? <SimpleForm handleForm={setSimpleForm} counties={counties} setPageAlert={setPageAlert} /> : null}
            {registerForm ? <RegisterForm handleForm={setRegisterForm} counties={counties} setPageAlert={setPageAlert} /> : null}
            {advancedForm ? <AdvancedForm handleForm={setAdvancedForm} counties={counties} setPageAlert={setPageAlert} /> : null}
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