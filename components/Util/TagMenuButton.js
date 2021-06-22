export default function TagMenuButton(props) {
    const { name, value, changeTag } = props
    return (
        <button
            className='hover:bg-gray-200 text-gray-700 w-full px-4 py-2 text-sm text-left'
            onClick={() => changeTag(value)}
        >
            {name}
        </button>
    )
}