import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/admin/signin',
        newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async signIn(user, account, profile) {
            const url = 'http://localhost:3001/admin/create_account'
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'kares-access': 'true'
                },
                body: JSON.stringify(profile)
            }

            const res = await fetch(url, options)

            if (res.ok) return true
            else return false
        },
        async redirect(url, baseUrl) {
            if (url) return url
            else return baseUrl
        },
        async session(session, token) {
            session.user.counties = token.counties
            session.user.roles = token.roles
            return session
        },
        async jwt(token, user, account, profile, isNewUser) {
            const url = `http://localhost:3001/admin/get_admin/${token.email}`
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'kares-access': 'true'
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