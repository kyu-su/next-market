// app/api/user/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request: NextRequest ) {
    const body = await request.json();

    try {
        await connectDB();
        const userData = await UserModel.findOne({ email: body.email });
        console.log(userData);

        if (userData && userData.password === body.password) {
            const payload = {
                email: userData.email,
            }
            const secretKey = new TextEncoder().encode("next-market-app-book");
            const token = await new SignJWT(payload)
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("1d")
                .sign(secretKey);
            console.log(token);

            return NextResponse.json({ message: "ログイン成功" });
        }

        return NextResponse.json({ message: "ログイン失敗" });
    } catch (e) {
        return NextResponse.json({ message: "ログイン失敗" });
    }
}
