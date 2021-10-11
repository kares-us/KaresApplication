import React, { useState } from 'react'
import { useRouter } from 'next/router'
import fetchHelper from '../../../util/fetchHelper'

import CountyDropdown from '../../Util/CountyDropdown'
import Input from '../../Util/Input'
import QuestionDropDown from '../../Util/QuestionDropdown'
import Disclaimer from './Disclaimer'
import Checkbox from '../../Util/Checkbox'
import Button from '../../Util/Button'


export default function AdvancedForm(props) {
  const { counties, handleForm, setPageAlert } = props
  const router = useRouter()
  const [county, setCounty] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [transportation, setTransportation] = useState('')
  const [employed, setEmployed] = useState('')
  const [highestGrade, setHighestGrade] = useState('')
  const [student, setStudent] = useState('')
  const [housingNeeds, setHousingNeeds] = useState('')
  const [englishPrimLang, setEnglishPrimLang] = useState('')
  const [criminalHis, setCriminalHis] = useState('')
  const [clothingNeeds, setClothingNeeds] = useState('')
  const [internet, setInternet] = useState('')
  const [authToWorkInUS, setAuthToWorkInUS] = useState('')
  const [tanfOrKtap, setTanfOrKtap] = useState('')
  const [disclaimer, setDisclaimer] = useState(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)




  async function submitAdvancedForm(data) {
    let res = await fetchHelper('/visitor/submit_advanced', "POST", data)
    let json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else router.push(`/resources/${county._id}`)

  }

  return (
    <div className='z-50 fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
      <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
      <div className='w-11/12 max-w-2xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
        <p className='text-xl font-semibold'>Request Assistance</p>
        <hr className='border-2 my-5' />
        <p className='text-xl my-2'>County <span className='text-red-500'>*</span></p>
        <CountyDropdown selected={county ? county.name : null} counties={counties} setCounty={setCounty} />
        <Input name={'Name'} value={name} handleChange={setName} required />
        <Input name={'Email'} value={email} handleChange={setEmail} />
        <Input name={'Contact Number'} value={phone} handleChange={setPhone} required />
        <Input name={'Address'} value={address} handleChange={setAddress} />
        <Input name={'State'} value={state} handleChange={setState} />
        <Input name={'City'} value={city} handleChange={setCity} />
        <Input name={'Zip Code'} value={zipCode} handleChange={setZipCode} />
        <QuestionDropDown question={'Do you have transportation?'} answers={['Yes', 'No']} value={transportation} setValue={setTransportation} />
        <QuestionDropDown question={'Are you employed?'} answers={['Yes', 'No']} value={employed} setValue={setEmployed} />
        <QuestionDropDown question={'Highest Grade Completed?'} answers={['Did not finish High School', 'HS/GED', 'College Degree', 'Other']} value={highestGrade} setValue={setHighestGrade} />
        <QuestionDropDown question={'Are you a student?'} answers={['No', 'WKU', 'SKYCTC', 'DAYMAR', 'Indiana Tech', 'Other']} value={student} setValue={setStudent} />
        <QuestionDropDown question={'Do you have housing needs?'} answers={['Yes', 'No']} value={housingNeeds} setValue={setHousingNeeds} />
        <QuestionDropDown question={'Is English your primary language?'} answers={['Yes', 'No']} value={englishPrimLang} setValue={setEnglishPrimLang} />
        <QuestionDropDown question={'Do you have criminal conviction history?'} answers={['Yes', 'No']} value={criminalHis} setValue={setCriminalHis} />
        <QuestionDropDown question={'Do you have clothing needs?'} answers={['Yes', 'No']} value={clothingNeeds} setValue={setClothingNeeds} />
        <QuestionDropDown question={'Do you have access to the internet?'} answers={['Yes', 'No']} value={internet} setValue={setInternet} />
        <QuestionDropDown question={'Are you authorized to work in the US?'} answers={['Yes', 'No']} value={authToWorkInUS} setValue={setAuthToWorkInUS} />
        <QuestionDropDown question={'Are you receiving any of the following: TANF, KTAP?'} answers={['Yes', 'No']} value={tanfOrKtap} setValue={setTanfOrKtap} />

        <div className='flex my-3 justify-center'>
          <Checkbox checked={disclaimerAccepted} onChange={setDisclaimerAccepted} />
          <p className='text-center font-bold text-lg ml-3'> I acknowledge and agree to the <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => setDisclaimer(!disclaimer)}>confidentiality agreement.</span></p>
        </div>

        <div className='flex justify-evenly items-center mt-5 flex-wrap'>
          <Button
            onClick={() => handleForm(null)}
            color='blue'
            label='Close'
          />
          <Button
            onClick={() => submitAdvancedForm({ countyName: county ? county.name : null, county, name, email, phone, additionalInfo: { address, state, city, zipCode, transportation, employed, highestGrade, student, housingNeeds, englishPrimLang, criminalHis, clothingNeeds, internet, authToWorkInUS, tanfOrKtap }, createdAt: Date.now(), requestFulfilled: false })}
            color='green'
            label='Submit'
            disabled={!disclaimerAccepted}
          />
        </div>
        {disclaimer ? <Disclaimer handleForm={setDisclaimer} /> : null}
      </div>
    </div>
  )
}
