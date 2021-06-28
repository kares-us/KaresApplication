import { useRouter } from 'next/router'
import { useState } from 'react'

import AddCounty from './AddCounty'
import CountyView from './CountyView'

import Edit from '../../Icons/Edit'
import { SyncLoader } from 'react-spinners'

export default function CountyTable(props) {
    const { counties, addCounty, editCounty } = props

    const [countyAddForm, setCountyAddForm] = useState(false)
    const [countyViewForm, setCountyViewForm] = useState(false)
    const [countyFormInfo, setCountyFormInfo] = useState(null)


    function handleCountyForm(data) {
        setCountyFormInfo(data)
        setCountyViewForm(!countyViewForm)
    }

    function renderTable(counties) {
        return (
            <div className='bg-gray-300 px-4'>
                {counties.map(cnty => (
                    <div className='w-full flex justify-between items-center h-12 mb-2' key={cnty._id}>
                        <p className='w-full'>{cnty.name}</p>
                        <p className='w-full text-right hidden sm:block'>{cnty.resources.length}</p>
                        <div className='w-24 sm:w-full flex justify-end'>
                            <button className='p-1 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all' onClick={() => handleCountyForm(cnty)}><Edit /></button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    function renderLoading() {
        return (
            <div className='h-screen flex justify-center items-center'>
                <SyncLoader color={'#374151'} />
            </div>
        )
    }

    return (
        counties ?
            <div className='w-11/12 max-w-5xl m-auto mt-12 p-4 bg-gray-200 flex flex-col'>
                <button onClick={() => setCountyAddForm(!countyAddForm)} className='mb-5 p-1 px-4 h-12 rounded-md bg-gray-100 hover:bg-gray-300 transition-all'>Add</button>
                <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
                    <p className='w-full'>Name</p>
                    <p className='w-full text-right'>Resources</p>
                    <p className='w-full text-right'>Manage</p>
                </div>
                {renderTable(counties)}
                {countyAddForm ? <AddCounty handleForm={setCountyAddForm} addCounty={addCounty} /> : null}
                {countyViewForm ? <CountyView data={countyFormInfo} handleForm={handleCountyForm} editCounty={editCounty} /> : null}
            </div >
            :
            renderLoading()
    );
}

