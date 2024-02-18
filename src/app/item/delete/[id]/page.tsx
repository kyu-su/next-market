"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";
import { env } from "@/env.mjs";

const DeleteItem = (context: { params: { id: string } }) => {
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
            const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
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
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    {image && <Image src={image} alt={title} width={750} height={500} />}
                    <h3>\{price}</h3>
                    <p>{description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    } else {
        return <h1>権限がありません</h1>
    }
}

export default DeleteItem;
