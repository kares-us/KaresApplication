import { useState, useEffect } from 'react';

import CountyDropdown from '../../Util/CountyDropdown';
import ResourceView from './ResourceView';
import AddResource from './AddResource';
import Edit from '../../Icons/Edit'
import Loading from '../Error/Loading';


export default function ResourceTable(props) {
    const { counties, functions } = props
    const { getCountyResources, createCountyResource, updateCountyResource, deleteCountyResource } = functions
    const [resources, setResources] = useState(null)

    const [county, setCounty] = useState(props.counties[0])
    const [resourceViewForm, setResourceViewForm] = useState({ open: false, data: null })
    const [resourceAddForm, setResourceAddForm] = useState(false)

    async function fetchResources() {
        const x = await getCountyResources(county._id)
        setResources(x.data)
    }

    useEffect(() => {
        fetchResources()
    }, [county])

    function renderTable(data) {
        return (
            <div className='flex flex-col rounded-md'>
                {data.map((resc, index) => (
                    <div className={`w-full flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`} key={resc._id}>
                        <p className='w-full'>{resc.name}</p>
                        <p className='w-full text-right hidden sm:block'>{resc.tag}</p>
                        <div className='w-24 sm:w-full flex justify-end'>
                            <button className='p-1 px-4 rounded-md bg-gray-600 hover:bg-gray-800 transition-all' onClick={() => setResourceViewForm({ open: !resourceViewForm.open, data: resc })}><Edit color='text-gray-200' /></button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!resources) return <Loading />
    else return (
        <div className='w-11/12 max-w-5xl m-auto mt-3 p-4 bg-gray-100 flex flex-col'>
            <div className='flex justify-between items-center px-3 mb-4'>
                <p className='text-2xl'>{county.name} County</p>

                <p className='text-xl'>Total Resources: {resources.length}</p>
            </div>
            <div className='flex justify-between'>
                <button
                    className='w-32 text-center bg-white h-10 border-2 border-gray-200 text-sm font-medium rounded-md shadow-sm hover:bg-gray-100 transition-all'
                    onClick={() => setResourceAddForm(!resourceAddForm)}
                >
                    Add
                </button>
                <div className='w-56'>
                    <CountyDropdown selected={county.name} counties={counties} setCounty={setCounty} />
                </div>
            </div>

            <hr className='border bg-gray-300 border-gray-300 my-3' />

            <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
                <p className='w-full'>Name</p>
                <p className='w-full text-right hidden sm:block'>Tag</p>
                <p className='w-full text-right'>Manage</p>
            </div>

            {renderTable(resources)}

            {resourceViewForm.open ? <ResourceView data={resourceViewForm.data} counties={counties} handleForm={setResourceViewForm} updateCountyResource={updateCountyResource} deleteCountyResource={deleteCountyResource} /> : null}
            {resourceAddForm ? <AddResource counties={counties} handleForm={setResourceAddForm} createCountyResource={createCountyResource} /> : null}

        </div>
    )
}
