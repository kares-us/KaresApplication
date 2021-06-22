import { getProviders, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function AdminSignIn(props) {
    const { providers } = props
    const router = useRouter()
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-800'>
            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button
                        onClick={() => signIn(provider.id, { callbackUrl: 'https:kares.us/admin' })}
                        className='px-16 mb-5 p-3 border-2 border-blue-500 text-lg font-normal bg-blue-300 hover:bg-blue-400 hover:border-blue-600 transition-all'
                    >Sign in with {provider.name}</button>
                </div>
            ))}
            <button
                onClick={() => router.push('https://kares.us/')}
                className='px-16 p-3 border-2 border-blue-500 text-lg font-normal bg-blue-300 hover:bg-blue-400 hover:border-blue-600 transition-all'
            >
                Back to Homepage
            </button>
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers }
    }
}