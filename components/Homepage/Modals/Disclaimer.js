import React from 'react'


export default function Disclaimer(props) {
  const { handleForm } = props
  return (
    <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
      <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
      <div className='w-11/12 max-w-2xl bg-white z-10 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
        <p className='text-2xl font-bold'>Disclaimer Notice</p>
        <hr className='border-2 my-5' />
        <p className='text-xl'>The personal information collected is used by the Cumberlands Workforce Development Board in order to provide appropriate access to resources and services to you, the user. We do not share your information outside of our service network.</p>
        <div className='flex justify-evenly items-center mt-5'>
          <button
            onClick={() => handleForm(null)}
            className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all'
          >
            Close
          </button>
        </div>
      </div>
    </div >
  )
}
