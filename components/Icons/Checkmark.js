export default function Checkmark(props) {
    const { color } = props

    function handleColor() {
        if (!color) return 'text-gray-500'
        else return color
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={"h-6 w-6 " + handleColor()} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    )
}
