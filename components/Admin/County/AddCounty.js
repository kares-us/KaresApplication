import { useState } from 'react'

import Input from '../../Util/Input'


export default function AddCounty(props) {
    const { handleForm, createCounty } = props

    const [name, setName] = useState('')
    const [navbar, setNavbar] = useState('#1F2937')
    const [primaryText, setPrimaryText] = useState('#F3F4F6')
    const [secondaryText, setSecondaryText] = useState('#6B7280')
    const [button, setButton] = useState('#93C5FD')

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl font-medium'>Creating County</p>
                <hr className='border-2 my-5' />
                <Input name={'Name'} value={name} handleChange={setName} />
                <Input name={'Navbar'} value={navbar} handleChange={setNavbar} />
                <Input name={'Primary Text'} value={primaryText} handleChange={setPrimaryText} />
                <Input name={'Secondary Text'} value={secondaryText} handleChange={setSecondaryText} />
                <Input name={'Button Color'} value={button} handleChange={setButton} />
                <div className='flex justify-evenly items-center mt-5'>
                    <button
                        onClick={() => createCounty({ name, design: { navbar, primaryText, secondaryText, button } })}
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
