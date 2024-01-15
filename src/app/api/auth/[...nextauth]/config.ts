import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
export const config: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                passwd: {}
            },
            async authorize(credentials) {
                console.log(credentials)
                return {
                    id: '111',
                    name: JSON.stringify(credentials),
                    email: 'email',
                }
            }
        })
    ]
}