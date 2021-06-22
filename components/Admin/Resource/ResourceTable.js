import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners'

import { fetchCountyResources, updateResourceInformation, createResource, deleteResource } from '../../../util/fetchFunctions';

import CountyDropdown from '../CountyDropdown';
import ResourceView from './ResourceView';
import AddResource from './AddResource';
import Edit from '../../Icons/Edit'


export default function ResourceTable(props) {
    const { counties, setPageAlert } = props
    const [resources, setResources] = useState(null)

    const [county, setCounty] = useState(props.counties[0])
    const [resourceForm, setResourceForm] = useState(false)
    const [resourceAddForm, setResourceAddForm] = useState(false)
    const [resourceFormInfo, setResourceFormInfo] = useState(null)

    async function getCountyResources() {
        const res = await fetchCountyResources(county._id)
        if (res.type === 'Success') {
            const fetchedResources = res.data
            setResources(fetchedResources)
        }
        setPageAlert({ type: res.type, message: res.message })

    }

    useEffect(() => {
        getCountyResources()
    }, [county])

    async function editResource(id, data) {
        await updateResourceInformation(id, data)
            .then(res => {
                if (res.ok) router.reload()
                else setPageAlert({ type: res.type, message: res.message })
            })
    }

    async function addResource(data) {
        await createResource(data)
            .then(res => {
                if (res.ok) router.reload()
                else setPageAlert({ type: res.type, message: res.message })
            })
    }

    async function removeResource(data) {
        await deleteResource(data)
            .then(res => {
                if (res.ok) router.reload()
                else setPageAlert({ type: res.type, message: res.message })
            })
    }

    function handleResourceForm(data) {
        setResourceFormInfo(data)
        setResourceForm(!resourceForm)
    }

    function renderTable(resources) {
        return (
            <div className='bg-gray-300 px-4 rounded-md'>
                {resources.map(res => (
                    <div className='w-full flex justify-between items-center h-12 mb-2' key={res._id}>
                        <p className='w-full'>{res.name}</p>
                        <p className='w-full text-right hidden sm:block'>{res.tag}</p>
                        <div className='w-24 sm:w-full flex justify-end'>
                            <button className='p-1 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all' onClick={() => handleResourceForm(res)}><Edit /></button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='w-11/12 max-w-5xl m-auto mt-12 p-4 bg-gray-200 flex flex-col'>
            <div className='flex items-center mb-4 px-3'>
                <p className='text-xl'>{county.name} County</p>
                <div className='flex items-center ml-auto w-32'>
                    <CountyDropdown
                        selected={county.name}
                        counties={counties}
                        setCounty={setCounty}
                    />
                </div>
            </div>

            <div className='flex justify-between items-center px-3 mb-2'>
                {resources ? <p className='text-xl'>Total Resources: {resources.length}</p> : null}
                <button
                    className='w-32 text-center bg-white h-10 border-2 border-gray-200 text-sm font-medium rounded-md shadow-sm hover:bg-gray-100 transition-all'
                    onClick={() => setResourceAddForm(!resourceAddForm)}
                >
                    Add
                </button>
            </div>

            <hr className='border-2 border-gray-300 my-4 mx-2' />

            <div className='w-full flex justify-between items-center font-semibold px-4 py-1 mb-2'>
                <p className='w-full'>Name</p>
                <p className='w-full text-right hidden sm:block'>Tag</p>
                <p className='w-full text-right'>Manage</p>
            </div>

            {resources ? renderTable(resources) : <div className='flex justify-center items-center'><SyncLoader color={'#374151'} /></div>}
            {resourceAddForm ? <AddResource handleForm={setResourceAddForm} addResource={addResource} counties={counties} /> : null}
            {resourceForm ? <ResourceView handleForm={handleResourceForm} editResource={editResource} removeResource={removeResource} data={resourceFormInfo} /> : null}
        </div>
    )
}
