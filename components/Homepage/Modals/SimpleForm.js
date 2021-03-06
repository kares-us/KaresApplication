import React, { useState } from 'react'
import { useRouter } from 'next/router'
import fetchHelper from '../../../util/fetchHelper'

import CountyDropdown from '../../Util/CountyDropdown'
import Input from '../../Util/Input'
import Disclaimer from './Disclaimer'
import Checkbox from '../../Util/Checkbox'
import Button from '../../Util/Button'


export default function SimpleForm(props) {
  const { counties, handleForm, setPageAlert } = props
  const router = useRouter()
  const [county, setCounty] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [disclaimer, setDisclaimer] = useState(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)

  async function submitSimpleForm(data) {
    let res = await fetchHelper('/visitor/submit_simple', "POST", data)
    let json = await res.json()

    if (!res.ok) setPageAlert({ type: 'Error', message: json.message })
    else router.push(`/resources/${county._id}`)
  }

  return (
    <div className='z-50 fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
      <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
      <div className='w-11/12 max-w-2xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
        <p className='text-xl font-semibold'>Explore Kares</p>
        <hr className='border-2 my-5' />
        <p className='text-xl my-2'>County <span className='text-red-500'>*</span></p>
        <CountyDropdown selected={county ? county.name : null} counties={counties} setCounty={setCounty} />
        <Input name={'Name'} value={name} handleChange={setName} required />
        <Input name={'Email'} value={email} handleChange={setEmail} />
        <Input name={'Contact Number'} value={phone} handleChange={setPhone} required />

        <div className='flex my-5 justify-center'>
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
            onClick={() => submitSimpleForm({ county, name, email, phone, createdAt: Date.now() })}
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
