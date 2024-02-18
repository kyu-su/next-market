"use client";

import { useState } from "react";
import { env } from "@/env.mjs";

const Register = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
            });

            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }

    return (
        <div>
            <header>ヘッダーです</header>
            <h1 className="page-title">ユーザ登録</h1>
            <form onSubmit={ handleSubmit } >
                <input type="text" placeholder="ユーザ名" required value={ newUser.name } onChange={handleChange} />
                <input type="email" placeholder="メールアドレス" required value={ newUser.email } onChange={handleChange} />
                <input type="password" placeholder="パスワード" required value={ newUser.password } onChange={handleChange} />
                <button type="submit">登録</button>
            </form>
            <footer>フッターです</footer>
        </div>
    )
}

export default Register;
