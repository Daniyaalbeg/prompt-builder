import { auth } from "@/auth/lucia";
import { z } from 'zod'
import { NextResponse } from "next/server";

const schema = z.object({ email: z.string(), password: z.string() })

export async function POST(req: Request) {
	const headers = new Headers();
	const authRequest = auth.handleRequest(req, headers);
	
	try {
		const requestOrigin = req.headers.get("origin");
		const url = new URL(req.url);
		const isValidRequest = !!requestOrigin && requestOrigin === url.origin;
		if (!isValidRequest) {
			return new Response(null, {
				status: 403,
				headers
			});
		}

		const { email, password } = schema.parse(await req.json())

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: "username",
					providerUserId: email,
					password
				},
				attributes: {
					email,
					username: email
				}
			});
			const session = await auth.createSession(user.userId);
			authRequest.setSession(session); // set session cookie
			// redirect on successful attempt
			headers.set("location", "/builder");
			return new NextResponse(null, {
				status: 302,
				headers // important!
			});
		} catch (e) {
			// username already in use
			console.log(e)
			return NextResponse.json({error: "Something went wrong 1"}, {
				status: 400,
				headers,
			})
		}
	} catch (e) {
		console.log(e)
		return NextResponse.json({error: "Something went wrong 2"}, {
			status: 400,
			headers,
		})
	}
};