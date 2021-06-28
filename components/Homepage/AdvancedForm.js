import React, { useState } from 'react'
import { useRouter } from 'next/router'

import CountyDropdown from '../../components/Admin/CountyDropdown'
import Input from '../Util/Input'
import QuestionDropDown from './QuestionDropdown'

import { submitAdvancedForm } from '../../util/fetchFunctions'

export default function SimpleForm(props) {
    const { counties, handleForm, setPageAlert } = props
    const router = useRouter()
    const [county, setCounty] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [social, setSocial] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [transportation, setTransportation] = useState('')
    const [employed, setEmployed] = useState('')
    const [highestGrade, setHighestGrade] = useState('')
    const [credentials, setCredentials] = useState('')
    const [student, setStudent] = useState('')
    const [veteran, setVeteran] = useState('')
    const [spouseOfVeteran, setSpouseOfVeteran] = useState('')
    const [reqChildCare, setReqChildCare] = useState('')
    const [housingNeeds, setHousingNeeds] = useState('')
    const [englishPrimLang, setEnglishPrimLang] = useState('')
    const [criminalHis, setCriminalHis] = useState('')
    const [disabilityToDisclose, setDisabilityToDisclose] = useState('')
    const [clothingNeeds, setClothingNeeds] = useState('')
    const [internet, setInternet] = useState('')
    const [authToWorkInUS, setAuthToWorkInUS] = useState('')
    const [tanfOrKtap, setTanfOrKtap] = useState('')



    async function handleFormSubmission(data) {
        await submitAdvancedForm(data)
            .then(res => {
                if (res.type === 'Error') {
                    setPageAlert({ type: res.type, message: res.message })
                } else {
                    router.push(`/resources/${county._id}`)
                }
            })
    }

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-2xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl'>Request Assistance</p>
                <hr className='border-2 my-5' />
                <CountyDropdown selected={county ? county.name : null} counties={counties} setCounty={setCounty} />
                <Input name={'Name'} value={name} handleChange={setName} />
                <Input name={'Email'} value={email} handleChange={setEmail} />
                <Input name={'Phone'} value={phone} handleChange={setPhone} />
                <Input name={'Social'} value={social} handleChange={setSocial} />
                <Input name={'Address'} value={address} handleChange={setAddress} />
                <Input name={'State'} value={state} handleChange={setState} />
                <Input name={'City'} value={city} handleChange={setCity} />
                <Input name={'Zip Code'} value={zipCode} handleChange={setZipCode} />
                <QuestionDropDown question={'Do you have transportation?'} answers={['Yes', 'No']} value={transportation} setValue={setTransportation} />
                <QuestionDropDown question={'Are you employed?'} answers={['Yes', 'No']} value={employed} setValue={setEmployed} />
                <QuestionDropDown question={'Highest Grade Completed?'} answers={['Did not finish High School', 'HS/GED', 'College Degree', 'Other']} value={highestGrade} setValue={setHighestGrade} />
                <Input name={'Certificates/Credentials?'} value={credentials} handleChange={setCredentials} />
                <QuestionDropDown question={'Are you a student?'} answers={['No', 'WKU', 'SKYCTC', 'DAYMAR', 'Indiana Tech', 'Other']} value={student} setValue={setStudent} />
                <QuestionDropDown question={'Are you a military veteran?'} answers={['Yes', 'No']} value={veteran} setValue={setVeteran} />
                <QuestionDropDown question={'Are you the spouse of a military veteran?'} answers={['Yes', 'No']} value={spouseOfVeteran} setValue={setSpouseOfVeteran} />
                <QuestionDropDown question={'Do you require childcare / adult-care?'} answers={['Yes', 'No']} value={reqChildCare} setValue={setReqChildCare} />
                <QuestionDropDown question={'Do you have housing needs?'} answers={['Yes', 'No']} value={housingNeeds} setValue={setHousingNeeds} />
                <QuestionDropDown question={'Is English your primary language?'} answers={['Yes', 'No']} value={englishPrimLang} setValue={setEnglishPrimLang} />
                <QuestionDropDown question={'Do you have criminal conviction history?'} answers={['Yes', 'No']} value={criminalHis} setValue={setCriminalHis} />
                <QuestionDropDown question={'Do you have a disability you wish to disclose?'} answers={['Yes', 'No']} value={disabilityToDisclose} setValue={setDisabilityToDisclose} />
                <QuestionDropDown question={'Do you have clothing needs?'} answers={['Yes', 'No']} value={clothingNeeds} setValue={setClothingNeeds} />
                <QuestionDropDown question={'Do you have access to the internet?'} answers={['Yes', 'No']} value={internet} setValue={setInternet} />
                <QuestionDropDown question={'Are you authorized to work in the US?'} answers={['Yes', 'No']} value={authToWorkInUS} setValue={setAuthToWorkInUS} />
                <QuestionDropDown question={'Are you receiving any of the following: TANF, KTAP?'} answers={['Yes', 'No']} value={tanfOrKtap} setValue={setTanfOrKtap} />


                <div className='flex justify-evenly items-center mt-5'>
                    <div className='flex justify-evenly items-center mt-5 flex-wrap'>
                        <button
                            onClick={() => handleFormSubmission({ countyName: county ? county.name : null, county, name, email, phone, additionalInfo: { social, address, state, city, zipCode, transportation, employed, highestGrade, credentials, student, veteran, spouseOfVeteran, reqChildCare, housingNeeds, englishPrimLang, criminalHis, disabilityToDisclose, clothingNeeds, internet, authToWorkInUS, tanfOrKtap }, requestFulfilled: false })}
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
                </div>
            </div>
        </div>
    )
}
