import lucia from "lucia-auth";
import { nextjs } from "lucia-auth/middleware";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { connection } from "@/db";
import "lucia-auth/polyfill/node";

// Use web for edge runtime

const env = process.env.NODE_ENV === "development" ? "DEV" : "PROD";

export const auth = lucia({
  adapter: planetscale(connection),
  env,
  middleware: nextjs(),
  sessionExpiresIn: {
    activePeriod: 60 * 60 * 24 * 30, // 1 month
    idlePeriod: 0, // disable session renewal
  },
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      email: userData.email,
    };
  },
});

export type Auth = typeof auth;
