import { useState } from 'react'

import Input from '../../Util/Input'
import TagDropdown from '../../Util/TagDropdown'
import CountyDropdown from '../../Util/CountyDropdown'


export default function AddResource(props) {
    const { handleForm, createCountyResource, counties } = props

    const [county, setCounty] = useState(counties[0])
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [website1, setWebsite1] = useState('')
    const [website2, setWebsite2] = useState('')
    const [meetingTime, setMeetingTime] = useState('')
    const [tag, setTag] = useState('')

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '90%' }}>
                <p className='text-xl font-medium'>Creating Resource</p>
                <hr className='border-2 my-5' />
                <p className='text-xl my-2'>County</p>
                <CountyDropdown selected={county.name} counties={counties} setCounty={setCounty} />
                <hr className='mb-4' />
                <Input name={'Name'} value={name} handleChange={setName} />
                <Input name={'Phone'} value={phone} handleChange={setPhone} />
                <Input name={'Address'} value={address} handleChange={setAddress} />
                <Input name={'Website 1'} value={website1} handleChange={setWebsite1} />
                <Input name={'Website 2'} value={website2} handleChange={setWebsite2} />
                <Input name={'Meeting Time'} value={meetingTime} handleChange={setMeetingTime} />
                <p className='text-xl mb-3'>Tag</p>
                <TagDropdown value={tag} setTag={setTag} />
                <div className='flex justify-evenly items-center mt-5'>
                    <button
                        onClick={() => createCountyResource({ county: county._id, name, phone, address, website1, website2, meetingTime, tag })}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-green-500 bg-green-200 hover:bg-green-300 transition-all'
                    >
                        Create
                    </button>
                    <button
                        onClick={() => handleForm(null)}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
