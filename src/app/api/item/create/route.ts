// app/api/item/create/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
    return NextResponse.json({ message: "アイテム作成" });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);

    try {
        await connectDB();
        await ItemModel.create(body);

        return NextResponse.json({ message: "アイテム作成" });
    } catch (e) {
        return NextResponse.json({ message: "アイテム作成失敗" });
    }
}
