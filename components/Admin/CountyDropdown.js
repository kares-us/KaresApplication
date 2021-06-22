import { useState } from 'react'

export default function CountyDropdown(props) {
    const { selected, counties, setCounty } = props
    const [menuHidden, setMenu] = useState(true)

    return (
        <div className="relative inline-block text-left w-full">
            <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setMenu(!menuHidden)}>
                {selected === '' || !selected ? 'None' : selected }
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>


            <div hidden={menuHidden} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                    {counties.map(county => (
                        <button
                            className='hover:bg-gray-200 text-gray-700 w-full px-4 py-2 text-sm text-left'
                            onClick={() => {
                                setCounty(county)
                                setMenu(!menuHidden)
                            }}
                            key={county._id}
                        >
                            {county.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
