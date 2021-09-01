export default function Input(props) {
    const { name, value, handleChange, disabled, required } = props

    function handleValue() {
        if (!value) return ''
        return value
    }

    function handleRequired() {
        if (required) return <span className='text-red-500'>*</span>
        return ''
    }

    function handleDisability() {
        if (disabled) return 'opacity-60'
        return ''
    }

    return (
        <div>
            <p className='text-xl my-2'>{name.charAt(0).toUpperCase() + name.slice(1)} {handleRequired()}</p>
            <input
                value={handleValue()}
                onChange={(e) => handleChange(e.target.value)}
                className={`w-full p-4 text-lg rounded-md border-2 border-gray-200 bg-gray-100 mb-2 ${handleDisability()}`}
                disabled={disabled ? true : false}
            />
        </div>
    )
}
