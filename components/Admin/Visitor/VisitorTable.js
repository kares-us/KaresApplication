import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners'
import { useRouter } from 'next/router';
import { fetchCountyVisitors, markVisitorFulfilled, markVisitorArchived } from '../../../util/fetchFunctions';
import { CSVLink, CSVDownload } from 'react-csv'

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
    const [county, setCounty] = useState(counties[0])
    const router = useRouter()


    async function getCountyVisitors() {
        const res = await fetchCountyVisitors(county._id)
        if (res.type === 'Success') {
            const fetchedVisitors = res.data
            setVisitors(fetchedVisitors)
            setPageAlert({ type: res.type, message: res.message })
        } else {
            setPageAlert({ type: res.type, message: res.message })
        }
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

    function createCSV() {
        let visitorsToCSV = []

        visitors.forEach(vis => {
            visitorsToCSV.push({
                'Request Fulfilled': vis.requestFulfilled,
                'Name': vis.name,
                'Email': vis.email,
                'Phone': vis.phone,
                'County': vis.countyName,
                'Address': vis.additionalInfo ? vis.additionalInfo.address : '',
                'Social': vis.additionalInfo ? vis.additionalInfo.social : '',
                'State': vis.additionalInfo ? vis.additionalInfo.state : '',
                'City': vis.additionalInfo ? vis.additionalInfo.city : '',
                'Zip Code': vis.additionalInfo ? vis.additionalInfo.zipCode : '',
                'Transportation': vis.additionalInfo ? vis.additionalInfo.transportation : '',
                'Employed': vis.additionalInfo ? vis.additionalInfo.employed : '',
                'Highest Grade': vis.additionalInfo ? vis.additionalInfo.highestGrade : '',
                'Credentials': vis.additionalInfo ? vis.additionalInfo.credentials : '',
                'Student': vis.additionalInfo ? vis.additionalInfo.student : '',
                'Veteran': vis.additionalInfo ? vis.additionalInfo.veteran : '',
                'Spouce of Veteran': vis.additionalInfo ? vis.additionalInfo.spouceOfVeteran : '',
                'Require Care': vis.additionalInfo ? vis.additionalInfo.reqChildCare : '',
                'Housing Needs': vis.additionalInfo ? vis.additionalInfo.housingNeeds : '',
                'English Primary Language': vis.additionalInfo ? vis.additionalInfo.englishPrimLang : '',
                'Criminal History': vis.additionalInfo ? vis.additionalInfo.criminalHis : '',
                'Disability to Disclose': vis.additionalInfo ? vis.additionalInfo.disabilityToDisclose : '',
                'Clothing Needs': vis.additionalInfo ? vis.additionalInfo.clothingNeeds : '',
                'Internet': vis.additionalInfo ? vis.additionalInfo.internet : '',
                'Authorized to work in US': vis.additionalInfo ? vis.additionalInfo.authToWorkInUS : '',
                'TANF or KTAP': vis.additionalInfo ? vis.additionalInfo.tanfOrKtap : '',
            })
        })

        return <CSVLink className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all' data={visitorsToCSV}>Download CSV</CSVLink>
    }

    function renderTable(visitors) {
        return (
            <div className='bg-gray-300 px-4'>
                {visitors.map(vis => {
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

    function renderArchivedTable(visitors) {
        return (
            <div className='bg-gray-300 px-4'>
                {visitors.map(vis => {
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
        )
    }

    return (
        <div className='w-11/12 max-w-5xl m-auto mt-12 p-4 bg-gray-200 flex flex-col'>
            <div className='flex items-center justify-between mb-4 px-3'>
                <p className='text-xl'>{county.name} County</p>
                {visitors ? createCSV() : null}
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

            {visitors ? renderTable(visitors) : <div className='flex justify-center items-center'><SyncLoader color={'#374151'} /></div>
            }
            <p className='ml-1 my-3 text-xl font-medium'>Archived Visitors</p>
            {visitors ? renderArchivedTable(visitors) : <div className='flex justify-center items-center'><SyncLoader color={'#374151'} /></div>
            }
            {visitorForm ? <VisitorView handleForm={handleVisitorForm} markVisFulfilled={markFulFilled} data={visitorFormInfo} markVisArchived={markArchived} /> : null}
        </div >
    )
}
