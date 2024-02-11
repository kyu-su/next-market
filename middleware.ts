// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    console.log("This is a middleware");
    const token = await request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({message: "トークンがありません"});
    }

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        console.log(decodedJwt);

        return NextResponse.next();
    } catch (e) {
        return NextResponse.json({message: "トークンが無効です"});
    }
}

export const config = {
    mather: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}
