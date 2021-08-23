export default function KeyText(props) {
    const { title, text } = props
    return (
        <div className='w-full mb-4'>
            <p className='font-medium text-xl mb-1'>{String(title)}</p>
            <p className='text-lg ml-2'>{String(text) || "N/A"}</p>
        </div>
    )
}
