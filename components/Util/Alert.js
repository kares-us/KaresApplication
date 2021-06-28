import React from 'react'

export default function Alert(props) {
    const { type, message, handleAlert } = props

    function handleType() {
        if (!type) return 'bg-gray-200 border-gray-300'
        else if (type === 'Success') return 'bg-green-200 border-green-400'
        else if (type === 'Warning') return 'bg-yellow-200 border-yellow-400'
        else if (type === 'Error') return 'bg-red-200 border-red-400'
        else return 'bg-gray-200 border-gray-300'
    }

    return (
        <div className={`fixed top-5 left-2/4 transform -translate-x-2/4 border-2 w-full max-w-md p-3 rounded-md font-xl flex justify-between items-center z-50 ${handleType()}`}>
            <p><span className='font-semibold'>{type}</span>: {message}</p>
            <button
                className='p-1 rounded-xl hover:bg-gray-100 transition-all'
                onClick={() => handleAlert(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}
