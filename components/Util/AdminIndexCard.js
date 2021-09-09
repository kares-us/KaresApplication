import React from 'react';
import { useRouter } from 'next/router'
import Button from './Button';

function AdminIndexCard(props) {
  const { title, description, route } = props
  const router = useRouter()

  return (
    <div className='m-3 border rounded-md shadow-md p-3 bg-white max-w-sm w-full relative h-36'>
      <p className='text-xl'>{title}</p>
      <p className='text-md text-gray-400'>{description}</p>
      <div className='flex justify-end absolute bottom-1 right-1'>
        <Button
          color='blue'
          label='View'
          onClick={() => router.push(route)}
        />
      </div>
    </div>
  );
}

export default AdminIndexCard;