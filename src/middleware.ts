import { NextResponse,NextRequest } from "next/server";

const loggedInRoutes = [
    '/create-project',
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/auth/callback',
]

export async function middleware(req: NextRequest){
    if(loggedInRoutes.includes(req.nextUrl.pathname)){
        if(!req.cookies.get('next-auth.session-token')){
            return NextResponse.redirect(new URL('/api/auth/signin',req.nextUrl))
        }
    }
}

export const config = {
    matcher: [
        ...loggedInRoutes
    ]
}