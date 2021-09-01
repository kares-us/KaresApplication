import { useRouter } from 'next/router'
import { useState } from 'react'

import AddCounty from './AddCounty'
import CountyView from './CountyView'

import Edit from '../../Icons/Edit'
import { SyncLoader } from 'react-spinners'
import Loading from '../Error/Loading'

export default function CountyTable(props) {
    const { counties, addCounty, updateCounty } = props

    const [countyAddForm, setCountyAddForm] = useState(false)
    const [countyViewForm, setCountyViewForm] = useState(false)
    const [countyFormInfo, setCountyFormInfo] = useState(null)


    function handleCountyForm(data) {
        setCountyFormInfo(data)
        setCountyViewForm(!countyViewForm)
    }

    function renderTable(counties) {
        return (
            <div className=''>
                {counties.map((cnty, index) => (
                    <div className={`w-full flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`} key={cnty._id}>
                        <p className='w-full'>{cnty.name}</p>
                        <div className='w-24 sm:w-full flex justify-end'>
                            <button className='p-1 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all' onClick={() => handleCountyForm(cnty)}><Edit /></button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!counties) return <Loading />
    else return (
        <div className='w-11/12 max-w-5xl m-auto mt-12 p-4 bg-gray-100 flex flex-col'>
            <div className='flex justify-between items-center'>
                <p className='text-2xl'>Kares Counties</p>
                <button onClick={() => setCountyAddForm(!countyAddForm)} className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all'>Create</button>
            </div>
            <hr className='border bg-gray-300 border-gray-300 my-3' />
            <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
                <p className='w-full'>Name</p>
                <p className='w-full text-right'>Manage</p>
            </div>
            {renderTable(counties)}
            {countyAddForm ? <AddCounty handleForm={setCountyAddForm} addCounty={addCounty} /> : null}
            {countyViewForm ? <CountyView data={countyFormInfo} handleForm={handleCountyForm} updateCounty={updateCounty} /> : null}
        </div >
    )
}

