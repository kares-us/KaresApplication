import React, { useState } from 'react'
import { useRouter } from 'next/router'
import fetchHelper from '../../../util/fetchHelper'

import CountyDropdown from '../../Util/CountyDropdown'
import Input from '../../Util/Input'
import QuestionDropDown from '../../Util/QuestionDropdown'
import Disclaimer from './Disclaimer'


export default function SimpleForm(props) {
    const { counties, handleForm, setPageAlert } = props
    const router = useRouter()
    const [county, setCounty] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [referral, setReferral] = useState('')
    const [employmentAssitance, setEmploymentAssitance] = useState('')
    const [recoveryAssistance, setRecoveryAssistance] = useState('')
    const [housingAssistance, setHousingAssistance] = useState('')
    const [foodAssistance, setFoodAssistance] = useState('')
    const [careerOrJobTraining, setCareerOrJobTraining] = useState('')
    const [assistanceWithCollege, setAssistanceWithCollege] = useState('')
    const [incarceratedOrCorrectionalFacility, setIncarceratedOrCorrectionalFacility] = useState('')
    const [disclaimer, setDisclaimer] = useState(false)



    async function submitRegisterForm(data) {
        let res = await fetchHelper('/visitor/submit_register', "POST", data)
        let json = await res.json()

        if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
        else router.push(`/resources/${county._id}`)

    }

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-2xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl'>Register for Assitance</p>
                <hr className='border-2 my-5' />
                <p className='text-xl font-bold mb-5'>Note: This form is for re-entry programs, only. Form all other requests please use the "Request Assistance" form.</p>
                <p className='text-xl my-2'>County <span className='text-red-500'>*</span></p>
                <CountyDropdown selected={county ? county.name : null} counties={counties} setCounty={setCounty} />
                <Input name={'Name'} value={name} handleChange={setName} required />
                <Input name={'Contact Number'} value={phone} handleChange={setPhone} required />
                <Input name={'Address'} value={address} handleChange={setAddress} required />
                <Input name={'City'} value={city} handleChange={setCity} required />
                <Input name={'Zip Code'} value={zipCode} handleChange={setZipCode} required />
                <QuestionDropDown question={'Referral Source'} answers={['County Attorney', 'Jail', 'Recovery Center', 'Other']} value={referral} setValue={setReferral} required />
                <QuestionDropDown question={'Do you need employment assistance?'} answers={['Yes', 'No']} value={employmentAssitance} setValue={setEmploymentAssitance} required />
                <QuestionDropDown question={'Do you need recovery assistance?'} answers={['Yes', 'No']} value={recoveryAssistance} setValue={setRecoveryAssistance} required />
                <QuestionDropDown question={'Do you need housing assistance?'} answers={['Yes', 'No']} value={housingAssistance} setValue={setHousingAssistance} required />
                <QuestionDropDown question={'Do you need food assistance?'} answers={['Yes', 'No']} value={foodAssistance} setValue={setFoodAssistance} required />
                <QuestionDropDown question={'Do you need career or job training?'} answers={['Yes', 'No']} value={careerOrJobTraining} setValue={setCareerOrJobTraining} required />
                <QuestionDropDown question={'Do you need assistance with college or technical school?'} answers={['Yes', 'No']} value={assistanceWithCollege} setValue={setAssistanceWithCollege} required />
                <QuestionDropDown question={'Are you currently incarcerated or in a treatment or correctional facility?'} answers={['Yes', 'No']} value={incarceratedOrCorrectionalFacility} setValue={setIncarceratedOrCorrectionalFacility} required />

                <p className='mt-3 text-center font-bold text-lg'>By submitting this form you have acknowledge our <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => setDisclaimer(!disclaimer)}>confidentiality agreement.</span></p>

                <div className='flex justify-evenly items-center mt-5 flex-wrap'>
                    <button
                        onClick={() => submitRegisterForm({ county, name, phone, registerInfo: { referral, employmentAssitance, recoveryAssistance, housingAssistance, foodAssistance, careerOrJobTraining, assistanceWithCollege, incarceratedOrCorrectionalFacility }, requestFulfilled: false })}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-green-500 bg-green-200 hover:bg-green-300 transition-all'
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => handleForm(null)}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all'
                    >
                        Close
                    </button>
                </div>
                {disclaimer ? <Disclaimer handleForm={setDisclaimer} /> : null}
            </div>
        </div>
    )
}
