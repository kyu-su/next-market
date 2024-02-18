// app/api/item/readall/route.ts

import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
    try {
        await connectDB();
        const allItems = await ItemModel.find();


        return NextResponse.json({ message: "アイテム読み取り成功 All", allItems: allItems });
    } catch (e) {
        return NextResponse.json({ message: "アイテム読み取り失敗 All" });
    }
}

export const revalidate = 0;
