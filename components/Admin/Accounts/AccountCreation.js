import React, { useState } from 'react'
import Button from '../../Util/Button'
import Input from '../../Util/Input'

export default function AccountCreation(props) {
  const { createAccount } = props
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className='flex justify-center items-center mt-5 max-w-lg mx-auto w-11/12'>
      <Button label='Create Account' color='blue' onClick={() => setOpen(!open)} extraClasses='w-full' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-11/12 max-w-2xl bg-white rounded-md' hidden={!open}>
        <div className='px-5 py-5 bg-gray-700 rounded-t-lg text-gray-200 text-3xl'>Create Account</div>
        <div className='p-4'>
          <Input name='Account' value={email} handleChange={setEmail} />
          <Button label='Create' color='green' onClick={() => createAccount({ email })} extraClasses='w-full' />
        </div>
      </div>
      <div className='absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 z-10' hidden={!open} />
    </div>
  )
}
