import { useState } from 'react'

import Edit from '../../Icons/Edit'

import AccountView from './AccountView'

export default function AccountTable(props) {
    const { accounts, editAccount, counties } = props

    const [accountViewForm, setAdminViewForm] = useState(false)
    const [accountFormInfo, setAdminFormInfo] = useState(null)


    function handleAccountForm(data) {
        setAdminFormInfo(data)
        setAdminViewForm(!accountViewForm)
    }

    function renderTable(accounts) {
        return (
            <div className='bg-gray-300 px-4'>
                {accounts.map(acc => (
                    <div className='w-full flex justify-between items-center h-12 mb-2' key={acc._id}>
                        <p className='w-full'>{acc.email}</p>
                        <p className='w-full text-right hidden sm:block'>{acc.name}</p>
                        <div className='w-24 sm:w-full flex justify-end'>
                            <button className='p-1 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all' onClick={() => handleAccountForm(acc)}><Edit /></button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='w-11/12 max-w-5xl m-auto mt-12 p-4 bg-gray-200 flex flex-col'>
            <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
                <p className='w-full'>Email</p>
                <p className='w-full text-right hidden sm:block'>Name</p>
                <p className='w-full text-right'>Manage</p>
            </div>
            {accounts ? renderTable(accounts) : null}
            {accountViewForm ? <AccountView data={accountFormInfo} handleForm={handleAccountForm} editAccount={editAccount} counties={counties} /> : null}
        </div >
    );
}

