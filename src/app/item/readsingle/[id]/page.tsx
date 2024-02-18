import Image from "next/image";
import Link from "next/link";
import { env } from "@/env.mjs";

const getSingleItem = async (id: string) => {
    const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"});
    const json = await response.json();
    const singleItem = json.singleItem;

    return singleItem;
}

const ReadSingleItem = async (context: { params: { id: string } }) => {
    const singleItem = await getSingleItem(context.params.id);
    return (
        <div className="grid-container-si">
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority />
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>\{singleItem.price}</h2>
                <hr />
                <p>{singleItem.description}</p>
                <div>
                    <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleItem;
