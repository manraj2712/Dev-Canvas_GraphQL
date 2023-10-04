import { NextResponse,NextRequest } from "next/server";

const loggedInRoutes = [
    '/create-project',
]

export async function middleware(req: NextRequest){
    // if(loggedInRoutes.includes(req.nextUrl.pathname)){
    //     if(!req.cookies.get('next-auth.session-token')){
    //         return NextResponse.redirect(new URL('/',req.nextUrl))
    //     }
    // }
}

export const config = {
    matcher: [
        '/create-project'
    ]
}