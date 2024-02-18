import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("");

    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/user/login");
            } else {
                try {
                    const secretKey = new TextEncoder().encode("next-market-app-book");
                    const decodedJwt = await jwtVerify(token, secretKey) as { payload: { email: string } };
                    setLoginUserEmail(decodedJwt.payload.email);
                } catch (error) {
                    router.push("/user/login");
                }
            }
        }

        checkToken();
    }, [router]);

    return loginUserEmail;
}

export default useAuth;
