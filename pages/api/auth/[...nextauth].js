import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

let prodURL = 'https://kares-api.herokuapp.com'
let localURL = 'http://localhost:3001'
let apiURL = prodURL

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            domain: 'https://kares.us/'
        })
    ],
    pages: {
        signIn: '/admin/signin',
        newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async signIn(user, account, profile) {
            const url = `${apiURL}/admin/create_account`
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            }

            const res = await fetch(url, options)

            if (res.ok) return true
            else return false
        },
        async redirect(url, baseUrl) {
            if (url) return url
            else return '/'
        },
        async session(session, token) {
            session.user.counties = token.counties
            session.user.roles = token.roles
            return session
        },
        async jwt(token, user, account, profile, isNewUser) {
            const url = `${apiURL}/admin/get_admin/${token.email}`
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            const res = await fetch(url, options)
            const json = await res.json()

            token.counties = json.data ? json.data.counties : []
            token.roles = json.data ? json.data.roles : []


            return token
        }
    }
})