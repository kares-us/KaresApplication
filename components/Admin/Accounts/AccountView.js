import { useState } from 'react'

import Input from '../../Util/Input'
import Roles from './Roles'
import CountyDropdown from '../CountyDropdown'

export default function AccountView(props) {
    const { data, handleForm, editAccount, counties } = props

    console.log()

    const [name, setName] = useState(data.name)
    const [email, setEmail] = useState(data.email)
    const [admin, setAdmin] = useState(data.roles.includes('Admin'))
    const [countyManager, setCountyManager] = useState(data.roles.includes('County Manager'))
    const [county, setCounty] = useState(data.county)

    function handleEditAccountSubmission() {
        console.log('hello')
        let newRoles = []
        admin ? newRoles.push('Admin') : null
        countyManager ? newRoles.push('County Manager') : null

        editAccount({ name, email, roles: newRoles, county })
    }

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl'>Viewing: <span className='font-medium'>{data.name}</span></p>
                <hr className='border-2 my-5' />
                <Input name={'Name'} value={name} handleChange={setName} disabled />
                <Input name={'Email'} value={email} handleChange={setEmail} disabled />
                <Roles roles={{ admin, countyManager }} setAdmin={setAdmin} setCountyManager={setCountyManager} />
                <CountyDropdown selected={county ? county.name : null} counties={counties} setCounty={setCounty}/>
                <div className='flex justify-evenly items-center mt-5'>
                    <div className='flex justify-evenly items-center mt-5 flex-wrap'>
                        <button
                            onClick={() => handleEditAccountSubmission()}
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
