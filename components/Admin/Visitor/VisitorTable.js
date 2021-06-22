import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners'
import { useRouter } from 'next/router';
import { fetchCountyVisitors, markVisitorFulfilled, markVisitorArchived } from '../../../util/fetchFunctions';
import { CSVLink } from 'react-csv'
import { createCSV } from '../../../util/helperFunctions';

import CountyDropdown from '../CountyDropdown';
import VisitorView from './VisitorView';

import Checkmark from '../../Icons/Checkmark';
import X from '../../Icons/X'
import Edit from '../../Icons/Edit'


export default function VisitorTable(props) {
    const { counties, setPageAlert } = props
    const [visitorForm, setVisitorForm] = useState(false)
    const [visitorFormInfo, setVisitorFormInfo] = useState()
    const [visitors, setVisitors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [county, setCounty] = useState(counties[0])
    const router = useRouter()


    async function getCountyVisitors() {
        setLoading(true)
        const res = await fetchCountyVisitors(county._id)
        if (res.type === 'Success') {
            const fetchedVisitors = res.data
            setVisitors(fetchedVisitors)
            setPageAlert({ type: res.type, message: res.message })
        } else {
            setPageAlert({ type: res.type, message: res.message })
        }
        setLoading(false)
    }

    useEffect(() => {
        getCountyVisitors()
    }, [county])

    async function markFulFilled(id) {
        const res = await markVisitorFulfilled(id)
        if (res.type === 'Success') router.reload()
        else setPageAlert({ type: res.type, message: res.message })
    }

    async function markArchived(id) {
        const res = await markVisitorArchived(id)
        if (res.type === 'Success') router.reload()
        else setPageAlert({ type: res.type, message: res.message })
    }

    function handleVisitorForm(data) {
        setVisitorFormInfo(data)
        setVisitorForm(!visitorForm)
    }

    function renderTable(vistrs) {
        if (vistrs.length === 0) {
            return <p className='text-center text-2xl my-5'>No visitors found.</p>
        }

        return (
            <div className='bg-gray-300 px-4'>
                {vistrs.map(vis => {
                    if (!vis.archived) return (
                        <div className='w-full flex justify-between items-center h-12' key={vis._id}>
                            <p className='w-full'>{vis.name}</p>
                            <p className='w-full text-right hidden sm:block'>{vis.phone}</p>
                            <div className='w-full flex justify-end'>
                                {vis.requestFulfilled ? <Checkmark color='text-green-600' /> : <X color='text-red-600' />}
                            </div>
                            <div className='w-full flex justify-end'>
                                <button className='p-1 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all' onClick={() => handleVisitorForm(vis)}><Edit /></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderArchivedTable(vistrs) {
        let archivedVisitors = []

        vistrs.forEach(vis => {
            if (vis.archived) archivedVisitors.push(vis)
        })

        if (archivedVisitors.length === 0) return null

        return (
            <>
                <p className='ml-1 my-3 text-xl font-medium'>Archived Visitors</p>
                <div className='bg-gray-300 px-4'>
                    {archivedVisitors.map(vis => {
                        if (vis.archived) return (
                            <div className='w-full flex justify-between items-center h-12' key={vis._id}>
                                <p className='w-full'>{vis.name}</p>
                                <p className='w-full text-right hidden sm:block'>{vis.phone}</p>
                                <div className='w-full flex justify-end'>
                                    {vis.requestFulfilled ? <Checkmark color='text-green-600' /> : <X color='text-red-600' />}
                                </div>
                                <div className='w-full flex justify-end'>
                                    <button className='p-1 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all' onClick={() => handleVisitorForm(vis)}><Edit /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
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
        visitors && county && !loading ?
            <div className='w-11/12 max-w-5xl m-auto mt-12 p-4 bg-gray-200 flex flex-col'>
                <div className='flex items-center justify-between mb-4 px-3'>
                    <p className='text-xl'>{county.name} County</p>
                    <CSVLink className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all' filename={`${county.name}_visitors`} data={createCSV(visitors)}>Download CSV</CSVLink>
                    <div className='flex items-center w-32'>
                        <CountyDropdown selected={county.name} counties={counties} setCounty={setCounty} />
                    </div>
                </div>

                <hr className='border-2 border-gray-300 my-4 mx-2' />

                <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
                    <p className='w-full'>Name</p>
                    <p className='w-full text-right hidden sm:block'>Phone</p>
                    <p className='w-full text-right'>Assistance</p>
                    <p className='w-full text-right'>Manage</p>
                </div>

                {renderTable(visitors)}
                {renderArchivedTable(visitors)}

                {visitorForm ? <VisitorView handleForm={handleVisitorForm} markVisFulfilled={markFulFilled} data={visitorFormInfo} markVisArchived={markArchived} /> : null}
            </div >
            :
            renderLoading()
    )
}
