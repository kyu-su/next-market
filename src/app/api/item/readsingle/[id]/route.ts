// app/api/item/readsingle/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(request: NextRequest, context: any ) {
    console.log(context);

    try {
        await connectDB();
        const singleItem = await ItemModel.findById(context.params.id);

        return NextResponse.json({ message: "アイテム読み取り成功 Single", singleItem: singleItem });
    } catch (e) {
        return NextResponse.json({ message: "アイテム読み取り成功" });
    }
}
