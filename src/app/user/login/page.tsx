"use client"

import { useState } from "react";
import { env } from "@/env.mjs";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email" : email,
                    "password": password,
                }),
            });

            const jsonData = await response.json();
            localStorage.setItem("token", jsonData.token);
            alert(jsonData.message);
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }

    return (
        <div>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={ handleSubmit }>
                <input type="email" placeholder="メールアドレス" required value={ email } onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="パスワード" required value={ password } onChange={(e) => setPassword(e.target.value)} />
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login;
