import { useState, useEffect } from 'react';

import CountyDropdown from '../../Util/CountyDropdown';
import VisitorView from './VisitorView';
import MonthDropdown from '../../Util/MonthDropdown';
import Loading from '../Error/Loading';
import VisitorSubTable from './VisitorSubTable';


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

    return <VisitorSubTable name='Explore' visitors={simpleVisitors} setVisitorForm={setVisitorForm} />
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
    return <VisitorSubTable name='Requested Assistance' visitors={advancedVisitors} setVisitorForm={setVisitorForm} />
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
    return <VisitorSubTable name='Registered Assistance' visitors={advancedVisitors} setVisitorForm={setVisitorForm} />
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
    return <VisitorSubTable name='Archived' visitors={archivedVisitors} setVisitorForm={setVisitorForm} />
  }

  if (!visitors) return <Loading />
  else return (
    <div className='w-11/12 max-w-5xl bg-gray-100 rounded-sm mx-auto mt-3 p-5'>
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
        <p className='w-full text-right hidden sm:block'>Phone</p>
        <p className='w-full text-right hidden sm:block'>Assistance</p>
        <p className='w-full text-right'>Manage</p>
      </div>
      {renderSimpleTable(visitors)}
      {renderAdvancedTable(visitors)}
      {renderRegisterTable(visitors)}
      {renderArchivedTable(visitors)}
      {visitorForm.open ? <VisitorView data={visitorForm.data} markVisFulfilled={markVisitorFulfilled} markVisArchived={markVisitorArchived} deleteVisitor={deleteVisitor} handleForm={setVisitorForm} /> : null}
    </div>
  )
}
