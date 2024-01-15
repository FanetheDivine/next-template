import { withAuth } from 'next-auth/middleware'

export default withAuth(
    function middleware(req) {
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized(token) {
                console.log(1)
                if (token) {
                    console.log(token)
                }
                return true
            }
        },
        pages: {
            // error: '/'
        }
    }
)

export const config = {
    matcher: '/example/subPage'
}