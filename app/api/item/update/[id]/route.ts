// app/api/item/readsingle/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request: NextRequest, context: {params: {id: string}} ) {
    console.log(context);

    const body = await request.json();

    try {
        await connectDB();

        const singleItem = await ItemModel.findOne({ _id: context.params.id });

        if (singleItem.email !== body.email) {
            await ItemModel.updateOne({ _id: context.params.id }, body);

            return NextResponse.json({ message: "アイテム編集成功" });
        } else {
            return NextResponse.json({ message: "他の人が作成したアイテムです" });
        }
    } catch (e) {
        return NextResponse.json({ message: "アイテム編集失敗" });
    }
}
