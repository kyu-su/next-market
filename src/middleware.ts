// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({message: "トークンがありません"});
    }

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        console.log(secretKey);
        const decodedJwt = await jwtVerify(token, secretKey);
        console.log(decodedJwt);

        return NextResponse.next();
    } catch (e) {
        return NextResponse.json({message: "トークンが無効です"});
    }
}

export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}
