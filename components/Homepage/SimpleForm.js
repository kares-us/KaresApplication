import React, { useState } from 'react'
import { useRouter } from 'next/router'

import CountyDropdown from '../../components/Admin/CountyDropdown'
import Input from '../Util/Input'

import { submitSimpleForm } from '../../util/fetchFunctions'

export default function SimpleForm(props) {
    const { counties, handleForm, setPageAlert } = props
    const router = useRouter()
    const [county, setCounty] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    async function handleFormSubmission(data) {
        await submitSimpleForm(data)
            .then(res => {
                if (res.type === 'Error') {
                    setPageAlert({ type: res.type, message: res.message })
                } else {
                    router.push(`https://kares.us/resources/${county._id}`)
                }
            })
    }

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-2xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl'>Explore Kares</p>
                <hr className='border-2 my-5' />
                <CountyDropdown selected={county ? county.name : null} counties={counties} setCounty={setCounty} />
                <Input name={'Name'} value={name} handleChange={setName} />
                <Input name={'Email *'} value={email} handleChange={setEmail} />
                <Input name={'Phone'} value={phone} handleChange={setPhone} />
                <div className='flex justify-evenly items-center mt-5'>
                    <div className='flex justify-evenly items-center mt-5 flex-wrap'>
                        <button
                            onClick={() => handleFormSubmission({ county, name, email, phone, countyName: county ? county.name : null })}
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
