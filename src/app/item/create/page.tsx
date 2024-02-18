"use client"

import { useState } from "react";
import useAuth from "@/app/utils/useAuth";
import { env } from "@/env.mjs";

const CreateItem = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const loginUserEmail = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: "POST",
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

    if (loginUserEmail) {
        return (
            <div className="page-title">
                <h1>アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="タイトル" required onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" name="price" placeholder="価格" required onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" name="image" required onChange={(e) => setImage(e.target.value)} />
                    <textarea name="description" rows={15} placeholder="商品説明" required onChange={(e) => setDescription(e.target.value)} />
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem;
