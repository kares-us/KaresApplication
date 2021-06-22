import React from 'react'

export default function Searchbar(props) {
    const { name, value, handleChange } = props

    return (
        <div>
            <input 
                name={name}
                value={value}
                placeholder={name}
                onChange={(e) => handleChange(e.target.value)}
                className='w-full p-4 text-lg rounded-md border-2 border-gray-200 bg-gray-100 mb-2 text-center'
            />
        </div>
    )
}
