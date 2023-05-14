import lucia from "lucia-auth";
import { web } from "lucia-auth/middleware";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { connection } from "@/db/db"
import "lucia-auth/polyfill/node";

// Use web for edge runtime

const env = process.env.NODE_ENV === "development" ? "DEV" : "PROD";

export const auth = lucia({
	adapter: planetscale(connection),
	env,
	middleware: web(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			email: userData.email
		};
	}
});

export type Auth = typeof auth;

