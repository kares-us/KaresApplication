import React from 'react'

export default function Roles(props) {
    const { roles, setAdmin, setCountyManager } = props

    return (
        <div className='flex flex-col my-3'>
            <p className='text-xl mb-3'>Roles</p>
            <div>
                <input
                    className='p-5'
                    id='Admin'
                    type="checkbox"
                    name='Admin'
                    value='Admin'
                    checked={roles.admin}
                    onChange={(e) => setAdmin(!roles.admin)}
                />
                <label className='ml-2 text-lg' htmlFor='Admin'>Admin</label>
            </div>
            <div>
                <input
                    className='p-5'
                    id='County Manager'
                    type="checkbox"
                    name='County Manager'
                    value='County Manager'
                    checked={roles.countyManager}
                    onChange={(e) => setCountyManager(!roles.countyManager)}
                />
                <label className='ml-2 text-lg' htmlFor='County Manager'>County Manager</label>
            </div>
        </div>
    )
}
