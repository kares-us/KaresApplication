import { useState } from 'react'

import Input from '../../Util/Input'
import TagDropdown from '../../Util/TagDropdown'

export default function ResourceView(props) {
    const { data, handleForm, updateCountyResource, deleteCountyResource } = props

    const [name, setName] = useState(data.name)
    const [phone, setPhone] = useState(data.phone)
    const [address, setAddress] = useState(data.address)
    const [website1, setWebsite1] = useState(data.website1)
    const [website2, setWebsite2] = useState(data.website2)
    const [additionalInformation, setAdditionalInformation] = useState(data.additionalInformation)
    const [tag, setTag] = useState(data.tag)


    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm({ open: false, data: null })}></div>
            <div className='w-11/12 max-w-xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl'>Viewing: <span className='font-medium'>{data.name}</span></p>
                <hr className='border-2 my-5' />
                <Input name={'Name'} value={name} handleChange={setName} disabled />
                <Input name={'Phone'} value={phone} handleChange={setPhone} />
                <Input name={'Address'} value={address} handleChange={setAddress} />
                <Input name={'Website 1'} value={website1} handleChange={setWebsite1} />
                <Input name={'Website 2'} value={website2} handleChange={setWebsite2} />
                <Input name={'Additional Information'} value={additionalInformation} handleChange={setAdditionalInformation} />
                <p className='text-xl mb-3'>Tag</p>
                <TagDropdown value={tag} setTag={setTag} />
                <div className='flex justify-evenly items-center mt-5 flex-wrap'>
                    <button
                        onClick={() => updateCountyResource(data._id, { name, phone, address, website1, website2, additionalInformation, tag })}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-green-500 bg-green-200 hover:bg-green-300 transition-all'
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => deleteCountyResource(data._id)}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-red-500 bg-red-300 hover:bg-red-400 transition-all'
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleForm({ open: false, data: null })}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
