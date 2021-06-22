import { SyncLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className='flex h-screen bg-gray-800'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
                <SyncLoader color={'#92c5fd'} />
            </div>
        </div>
    )
}