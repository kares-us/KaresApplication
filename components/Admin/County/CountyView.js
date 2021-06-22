import { useState } from 'react'

import Input from '../../Util/Input'
export default function ResourceView(props) {
    const { data, handleForm, editCounty } = props
    const { design } = data

    const [name, setName] = useState(data.name)
    const [navbar, setNavbar] = useState(design.navbar)
    const [primaryText, setPrimaryText] = useState(design.primaryText)
    const [secondaryText, setSecondaryText] = useState(design.secondaryText)
    const [button, setButton] = useState(design.button)


    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl'>Viewing: <span className='font-medium'>{data.name}</span></p>
                <hr className='border-2 my-5' />
                <Input name={'Name'} value={name} handleChange={setName} />
                <Input name={'Navbar'} value={navbar} handleChange={setNavbar} />
                <Input name={'Primary Text'} value={primaryText} handleChange={setPrimaryText} />
                <Input name={'Secondary Text'} value={secondaryText} handleChange={setSecondaryText} />
                <Input name={'Button Color'} value={button} handleChange={setButton} />
                <div className='flex justify-evenly items-center mt-5'>
                    <div className='flex justify-evenly items-center mt-5 flex-wrap'>
                        <button
                            onClick={() => editCounty({ id: data._id, name, design: { navbar, primaryText, secondaryText, button } })}
                            className='p-2 m-1 px-4 w-36 rounded-md border-2 border-green-500 bg-green-200 hover:bg-green-300 transition-all'
                        >
                            Save Changes
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
