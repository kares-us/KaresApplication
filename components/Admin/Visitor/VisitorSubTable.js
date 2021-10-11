import React from 'react';
import Checkmark from '../../Icons/Checkmark';
import X from '../../Icons/X';
import Edit from '../../Icons/Edit';

export default function VisitorSubTable(props) {
  const { name, visitors, setVisitorForm } = props
  return (
    <div className='p-2'>
      <p className='text-gray-600 text-xl mb-2 font-semibold'>{name}</p>
      <div className='flex flex-col bg-gray-300 rounded-md'>
        {visitors.map((vis, index) => (
          <div key={vis._id} className={`w-full flex justify-between items-center p-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`}>
            <p className='w-full'>{vis.name}</p>
            <p className='w-full text-right hidden sm:block'>{vis.phone}</p>
            <div className='w-full flex justify-end'>
              {vis.requestFulfilled ? <Checkmark color='text-green-600' /> : <X color='text-red-600' />}
            </div>
            <div className='w-full flex justify-end'>
              <button className='p-1 px-4 rounded-md bg-gray-600 hover:bg-gray-800 transition-all' onClick={() => setVisitorForm({ open: true, data: vis })}><Edit color='text-gray-200' /></button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}