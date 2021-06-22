import React, { useState } from 'react'
import { fetchAllResources } from '../../util/fetchFunctions'

import TagFilter from '../../components/Resources/TagFilter'
import Searchbar from '../../components/Resources/Searchbar'
import ResourceView from '../../components/Resources/ResourceView'

export default function Resources(props) {
    const { resources, alrt } = props
    const [filteredResources, setFilteredResources] = useState(resources)
    const [selectedResource, setSelectedResource] = useState(null)
    const [resourceForm, setResourceForm] = useState(false)
    const [pageAlert, setPageAlert] = useState(alrt)
    const [searchFilter, setSearchFilter] = useState('')
    const [tagFilter, setTagFilter] = useState('')

    function handleResourceView(data) {
        setSelectedResource(data)
        setResourceForm(!resourceForm)
    }

    function renderFilteredResources() {
        const searchRes = resources.filter(res => res.name.toLowerCase().includes(searchFilter))
        const tagRes = searchRes.filter(res => res.tag.toLowerCase().includes(tagFilter))

        return (
            tagRes.map(resource => (
                <div key={resource._id} className='w-96 p-4 bg-gray-300 m-5 flex flex-col rounded-md' >
                    <p className='text-lg mb-1'>{resource.name}</p>
                    <p className='text-sm mb-4 ml-2 text-gray-500'>{resource.tag}</p>
                    <button className='ml-auto mt-auto px-4 py-2 bg-gray-500 rounded-md text-gray-200 hover:bg-gray-600 transition-all' onClick={() => handleResourceView(resource)}>View</button>
                </div>
            ))
        )
    }

    function renderNoResources() {
        return (
            <div className='w-full min-h-screen bg-gray-800 flex justify-center items-center'>
                <p className='text-white text-xl'>No resources found.</p>
            </div>
        )
    }
    function renderResources() {
        return (
            <div className='w-full min-h-screen bg-gray-800 pt-10'>
                {resourceForm ? <ResourceView handleForm={handleResourceView} data={selectedResource} /> : null}
                <div className='w-11/12 max-w-xl mx-auto'>
                    <Searchbar name={'Resource Name'} value={searchFilter} handleChange={setSearchFilter} />
                    <TagFilter value={tagFilter} setTag={setTagFilter} />
                </div>

                <div className='flex flex-wrap justify-center'>
                    {renderFilteredResources()}
                </div>
            </div>
        )
    }

    return (
        resources.length <= 0 ? renderNoResources() : renderResources()
    )
}


export async function getServerSideProps(context) {
    let resources
    let alrt = null
    const res = await fetchAllResources(context.params.id)

    if (res.type === 'Error') {
        alrt = { type: res.type, message: res.message }
    }
    else {
        resources = res.data
        alrt = { type: res.type, message: res.message }
    }

    return {
        props: {
            resources,
            alrt
        }
    }
}