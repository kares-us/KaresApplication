import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners'
import { CSVLink } from 'react-csv'
import { createCSV } from '../../../util/helperFunctions';

import CountyDropdown from '../../Util/CountyDropdown';
import VisitorView from './VisitorView';
import MonthDropdown from '../../Util/MonthDropdown';

import Checkmark from '../../Icons/Checkmark';
import X from '../../Icons/X'
import Edit from '../../Icons/Edit'
import Loading from '../Error/Loading';


export default function VisitorTable(props) {
  const { counties, functions } = props
  const { getVisitorsByCounty, markVisitorArchived, markVisitorFulfilled, deleteVisitor } = functions

  const [county, setCounty] = useState(counties[0])
  const [visitorForm, setVisitorForm] = useState({ open: false, data: null })
  const [visitors, setVisitors] = useState(null)
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth())

  async function fetchVisitors() {
    const x = await getVisitorsByCounty(county._id)
    if (x !== undefined) setVisitors(x.data)
    else return
  }

  useEffect(() => {
    fetchVisitors()
  }, [county])


  function renderSimpleTable(data) {
    let simpleVisitors = []

    data.forEach(vis => {
      if (vis.additionalInfo === null && vis.registerInfo === null && !vis.archived) {
        const visDate = new Date(vis.createdAt)
        if (visDate.getMonth() === filterMonth) simpleVisitors.push(vis)
      }
    })

    if (simpleVisitors.length === 0) return <p className='ml-2 text-lg'>No visitors.</p>

    return (
      <div className='flex flex-col bg-gray-300 rounded-md'>
        {simpleVisitors.map((vis, index) => (
          <div key={vis._id} className={`w-full flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`}>
            <p className='w-full'>{vis.name}</p>
            <p className='w-full text-right hidden sm:block'>{vis.phone}</p>
            <div className='w-full flex justify-end'>
              {vis.requestFulfilled ? <Checkmark color='text-green-600' /> : <X color='text-red-600' />}
            </div>
            <div className='w-full flex justify-end'>
              <button className='p-1 px-4 rounded-md bg-gray-600 hover:bg-gray-800 transition-all' onClick={() => setVisitorForm({ open: !visitorForm.open, data: vis })}><Edit color='text-gray-200' /></button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function renderAdvancedTable(data) {
    let advancedVisitors = []

    data.forEach(vis => {
      if (vis.additionalInfo !== null && vis.registerInfo === null && !vis.archived) {
        const visDate = new Date(vis.createdAt)
        if (visDate.getMonth() === filterMonth) advancedVisitors.push(vis)
      }
    })

    if (advancedVisitors.length === 0) return <p className='ml-2 text-lg'>No visitors requested assistance.</p>

    return (
      <div className='flex flex-col bg-gray-300 rounded-md'>
        {advancedVisitors.map((vis, index) => (
          <div key={vis._id} className={`w-full flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`}>
            <p className='w-full'>{vis.name}</p>
            <p className='w-full text-right hidden sm:block'>{vis.phone}</p>
            <div className='w-full flex justify-end'>
              {vis.requestFulfilled ? <Checkmark color='text-green-600' /> : <X color='text-red-600' />}
            </div>
            <div className='w-full flex justify-end'>
              <button className='p-1 px-4 rounded-md bg-gray-600 hover:bg-gray-800 transition-all' onClick={() => setVisitorForm({ open: !visitorForm.open, data: vis })}><Edit color='text-gray-200' /></button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function renderRegisterTable(data) {
    let advancedVisitors = []

    data.forEach(vis => {
      if (vis.additionalInfo === null && vis.registerInfo !== null && !vis.archived) {
        const visDate = new Date(vis.createdAt)
        if (visDate.getMonth() === filterMonth) advancedVisitors.push(vis)
      }
    })

    if (advancedVisitors.length === 0) return <p className='ml-2 text-lg'>No visitors requested assistance.</p>

    return (
      <div className='flex flex-col bg-gray-300 rounded-md'>
        {advancedVisitors.map((vis, index) => (
          <div key={vis._id} className={`w-full flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`}>
            <p className='w-full'>{vis.name}</p>
            <p className='w-full text-right hidden sm:block'>{vis.phone}</p>
            <div className='w-full flex justify-end'>
              {vis.requestFulfilled ? <Checkmark color='text-green-600' /> : <X color='text-red-600' />}
            </div>
            <div className='w-full flex justify-end'>
              <button className='p-1 px-4 rounded-md bg-gray-600 hover:bg-gray-800 transition-all' onClick={() => setVisitorForm({ open: !visitorForm.open, data: vis })}><Edit color='text-gray-200' /></button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function renderArchivedTable(data) {
    let archivedVisitors = []

    data.forEach(vis => {
      if (vis.archived) {
        const visDate = new Date(vis.createdAt)
        if (visDate.getMonth() === filterMonth) archivedVisitors.push(vis)
      }
    })

    if (archivedVisitors.length === 0) return <p className='ml-2 text-lg'>No archived visitors.</p>

    return (
      <div className='flex flex-col rounded-md'>
        {archivedVisitors.map((vis, index) => (
          <div key={vis._id} className={`w-full flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`}>
            <p className='w-full'>{vis.name}</p>
            <p className='w-full text-right hidden sm:block'>{vis.phone}</p>
            <div className='w-full flex justify-end'>
              {vis.requestFulfilled ? <Checkmark color='text-green-600' /> : <X color='text-red-600' />}
            </div>
            <div className='w-full flex justify-end'>
              <button className='p-1 px-4 rounded-md bg-gray-600 hover:bg-gray-800 transition-all' onClick={() => setVisitorForm({ open: !visitorForm.open, data: vis })}><Edit color='text-gray-200' /></button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!visitors) return <Loading />
  else return (
    <div className='w-full max-w-5xl bg-gray-100 rounded-sm mx-auto mt-3 p-5 mb-16'>
      <p className='text-2xl mb-5'>{county.name} County</p>
      <div className='flex justify-between'>
        <div className='w-32'>
          <MonthDropdown selected={filterMonth} setMonth={setFilterMonth} />
        </div>
        <div className='w-56'>
          <CountyDropdown selected={county.name} counties={counties} setCounty={setCounty} />
        </div>
      </div>

      <hr className='border bg-gray-300 border-gray-300 my-3' />
      <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
        <p className='w-full'>Name</p>
        <p className='w-full text-right hidden sm:block'>Assistance</p>
        <p className='w-full text-right'>Manage</p>
      </div>

      <div className='p-2'>
        <p className='text-gray-600 text-xl mb-2 font-semibold'> Explore</p>
        {renderSimpleTable(visitors)}
      </div>

      <div className='p-2'>
        <p className='text-gray-600 text-xl mb-2 font-semibold'> Requested Assistance</p>
        {renderAdvancedTable(visitors)}
      </div>
      <div className='p-2'>
        <p className='text-gray-600 text-xl mb-2 font-semibold'> Registered Assistance</p>
        {renderRegisterTable(visitors)}
      </div>
      <div className='p-2'>
        <p className='text-gray-600 text-xl mb-2 font-semibold'> Archived</p>
        {renderArchivedTable(visitors)}
      </div>

      {visitorForm.open ? <VisitorView data={visitorForm.data} markVisFulfilled={markVisitorFulfilled} markVisArchived={markVisitorArchived} deleteVisitor={deleteVisitor} handleForm={setVisitorForm} /> : null}
    </div>
  )
}
