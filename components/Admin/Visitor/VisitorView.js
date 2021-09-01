import KeyText from "../../Util/KeyText"

export default function VisitorView(props) {
    const { data, handleForm, markVisFulfilled, markVisArchived, deleteVisitor } = props

    function renderAdditionalInfo(data) {
        return (
            <>
                <p className='font-medium text-xl mb-1'>Additional Info</p>
                <hr className='border-2 mt-3 mb-5 border-gray-300' />
                <div className='ml-5'>
                    {Object.keys(data).map(key => (
                        <div key={key}>
                            <KeyText title={key.charAt(0).toUpperCase() + key.slice(1)} text={data[key]} />
                        </div>
                    ))
                    }
                </div>
            </>
        )
    }

    return (
        <div className='fixed top-0 left-0 transform w-full h-full flex justify-center items-center '>
            <div className='absolute top-0 left-0 z-0 transform w-full h-full bg-black opacity-50' onClick={() => handleForm({ open: false, data: null })}></div>
            <div className='w-11/12 max-w-xl bg-white z-10 p-4 rounded-md overflow-y-scroll' style={{ maxHeight: '95%' }}>
                <div className='p-4 rounded-md bg-gray-200'>
                    <p className='text-xl'>Viewing: <span className='font-medium'>{data.name}</span></p>
                    <hr className='border-2 my-5 border-gray-300' />
                    <KeyText title={'Full Name'} text={data.name} />
                    <KeyText title={'Phone Number'} text={data.phone} />
                    <KeyText title={'Email Address'} text={data.email} />
                    {data.additionalInfo ? renderAdditionalInfo(data.additionalInfo) : null}
                </div>


                <div className='flex flex-wrap justify-evenly items-center mt-5'>
                    {data.requestFulfilled ? null :
                        <button
                            onClick={() => markVisFulfilled(data._id)}
                            className='p-2 m-1 px-4 w-36 rounded-md border-2 border-green-500 bg-green-300 hover:bg-green-400 transition-all'
                        >
                            Mark Fulfilled
                        </button>
                    }
                    {data.archived ? null :
                        <button
                            onClick={() => markVisArchived(data._id)}
                            className='p-2 m-1 px-4 w-36 rounded-md border-2 border-yellow-500 bg-yellow-300 hover:bg-yellow-400 transition-all'
                        >
                            Archive
                        </button>
                    }
                    <button
                        onClick={() => deleteVisitor(data._id)}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-red-500 bg-red-300 hover:bg-red-400 transition-all'
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleForm({ open: false, data: null })}
                        className='p-2 m-1 px-4 w-36 rounded-md border-2 border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
