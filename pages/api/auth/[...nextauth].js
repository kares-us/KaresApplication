import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { dbURI } from '../../../util/globals'



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
            const url = `${dbURI}/admin/login`
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
            const providerToken = account ? account.id_token : null

            if (providerToken !== null) {
                const url = `${dbURI}/admin/token`
                const options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: providerToken
                    })
                }

                const res = await fetch(url, options)
                const json = await res.json()

                console.log(json)

                token.counties = json.data ? json.data.counties : []
                token.roles = json.data ? json.data.roles : []
            }

            return token
        }
    }
})