"use client"

import { useState, useEffect } from "react";
import useAuth from "@/app/utils/useAuth";
import { env } from "@/env.mjs";

const UpdateItem = (context: { params: { id: string } }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    const loginUserEmail = useAuth();

    useEffect(() => {
        const getSingleItem = async (id: string) => {
            const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"});
            const json = await response.json();
            const singleItem = json.singleItem;
            console.log(singleItem);

            setTitle(singleItem.title);
            setPrice(singleItem.price);
            setImage(singleItem.image);
            setDescription(singleItem.description);
            setEmail(singleItem.email);
        }

        getSingleItem(context.params.id);
    }, [context]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title,
                    price,
                    image,
                    description,
                    email: loginUserEmail,
                }),
            });

            const jsonData = await response.json();
            console.log(jsonData);

        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    if (loginUserEmail === email) {
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={title} name="title" placeholder="タイトル" required onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" value={price} name="price" placeholder="価格" required onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" value={image} name="image" required onChange={(e) => setImage(e.target.value)} />
                    <textarea name="description" value={description} rows={15} placeholder="商品説明" required onChange={(e) => setDescription(e.target.value)} />
                    <button>編集</button>
                </form>
            </div>
        )
    } else {
        return <h1>権限がありません</h1>
    }
}

export default UpdateItem;
