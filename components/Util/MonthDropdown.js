import { useState } from 'react'

import { formatMonth } from '../../util/helperFunctions'

export default function MonthDropdown(props) {
    const { selected, setMonth } = props
    const [menuHidden, setMenu] = useState(true)

    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    return (
        <div className="relative inline-block text-left w-full">
            <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setMenu(!menuHidden)}>
                {formatMonth(selected)}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>


            <div hidden={menuHidden} className="origin-top-right absolute -right-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                    {months.map(index => (
                        <button
                            className='hover:bg-gray-200 text-gray-700 w-full px-4 py-2 text-sm text-left'
                            onClick={() => {
                                setMonth(index)
                                setMenu(!menuHidden)
                            }}
                            key={index}
                        >
                            {formatMonth(index)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
