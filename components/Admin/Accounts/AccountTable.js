import { useState, useEffect } from 'react'
import fetchHelper from '../../../util/fetchHelper'

import Edit from '../../Icons/Edit'

import AccountView from './AccountView'
import Loading from '../Error/Loading'

export default function AccountTable(props) {
    const { counties, updateAccount, getAccounts } = props

    const [accounts, setAccounts] = useState(null)
    const [accountViewForm, setAdminViewForm] = useState(false)
    const [accountFormInfo, setAdminFormInfo] = useState(null)

    async function fetchAccounts() {
        const x = await getAccounts()
        if (x !== undefined) setAccounts(x.data)
        else return
    }

    useEffect(() => {
        fetchAccounts()
    }, [null])

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

    if (!accounts) return <Loading />
    else return (
        <div className='w-11/12 max-w-5xl m-auto mt-3 p-4 bg-gray-200 flex flex-col mb-16'>
            <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
                <p className='w-full'>Email</p>
                <p className='w-full text-right hidden sm:block'>Name</p>
                <p className='w-full text-right'>Manage</p>
            </div>
            {accounts ? renderTable(accounts) : null}
            {accountViewForm ? <AccountView data={accountFormInfo} counties={counties} handleForm={handleAccountForm} updateAccount={updateAccount} /> : null}
        </div >
    )
}


export async function getStaticProps(context) {
    let accounts = null

    let resAdmins = await fetchHelper('/api/admin', "GET")
    let jsonAdmins = await resAdmins.json()

    if (!resAdmins.ok) alrt = { type: "Error", message: jsonAdmins.message }
    else accounts = jsonAdmins.data

    console.log(jsonAdmins)

    return {
        props: { accounts }
    }
}

