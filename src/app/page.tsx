// app/page.js

import Link from 'next/link';
import Image from 'next/image';
import { env } from "@/env.mjs";

const getAllItems = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"});
  const json = await response.json();
  const allItems = json.allItems;

  return allItems;
}

const ReadAllItems = async () => {

  const allItems = await getAllItems();
  return (
    <div className="grid-container-in">
      {allItems.map((item: any) =>
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} width={750} height={500} alt="item-image" priority/>
          <h2>\{item.price}</h2>
          <h3>{item.title}</h3>
          <p>{item.description.substring(0,80)}...</p>
        </Link>
      )}
    </div>
  );
}

export default ReadAllItems;
