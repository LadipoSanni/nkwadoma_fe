// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode";


export function middleware(req: NextRequest){

    const encryptedToken =  req.cookies.get('access_token')?.value || ''
    const decryptedToken =  jwtDecode(encryptedToken)

    console.log("loan request: ", decryptedToken)
    // function isTokenValid(token: string){
    //     const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    //
    // }

}