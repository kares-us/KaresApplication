export default function ResourceView(props) {
    const { data, handleForm } = props

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 z-10 transform w-full h-full bg-black opacity-50' onClick={() => handleForm(null)}></div>
            <div className='w-11/12 max-w-2xl bg-white z-30 p-6 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <p className='text-xl'>{data.name}</p>
                <hr className='border-2 my-5' />
                <p className='text-xl mb-2'>
                    <span className='font-medium'>Phone:</span>
                    {data.phone ? <a className='text-blue-600' href={`tel:${data.phone}`}> {data.phone}</a> : ' N/A'}
                </p>
                <p className='text-xl mb-2'>
                    <span className='font-medium'>Address:</span>
                    {data.address ? <a className='text-blue-600' href={`https://www.google.com/maps/search/${data.address}`}> {data.address}</a> : ' N/A'}
                </p>
                <p className='text-xl mb-2'>
                    <span className='font-medium'>Website 1:</span>
                    {data.website1 ? <a className='text-blue-600' href={data.website1}> {data.website1}</a> : ' N/A'}
                </p>
                <p className='text-xl mb-2'>
                    <span className='font-medium'>Website 2:</span>
                    {data.website2 ? <a className='text-blue-600' href={data.website2}> {data.website2}</a> : ' N/A'}
                </p>
                <p className='text-xl mb-2'>
                    <span className='font-medium'>Additional Info:</span>
                    {data.meetingTime ? <a> {data.meetingTime}</a> : ' N/A'}
                </p>

                <div className='flex justify-evenly items-center mt-5'>
                    <div className='flex justify-evenly items-center mt-5 flex-wrap'>
                        <button
                            onClick={() => handleForm(null)}
                            className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all'
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
