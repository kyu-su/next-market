// app/api/user/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request: NextRequest ) {
    const body = await request.json();

    try {
        await connectDB();
        await UserModel.create(body);

        return NextResponse.json({ message: "ユーザ登録成功" });
    } catch (e) {
        return NextResponse.json({ message: "ユーザ登録失敗" });
    }
}
