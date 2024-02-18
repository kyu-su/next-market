import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // サーバサイドの環境変数
  server: {
    /** データベースの接続先のURL */
    DATABASE_URL: z.string().url(),
    /** OPEN AI の API KEY */
    API_KEY: z.string().min(1),
  },
  // クライアントサイドの環境変数
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   API_KEY: process.env.API_KEY,
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    NEXT_PUBLIC_DEBUG_MESSAGE: process.env.NEXT_PUBLIC_DEBUG_MESSAGE,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
});
