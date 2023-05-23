import { auth } from "@/auth/lucia";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	const headers = new Headers()

	const authRequest = auth.handleRequest({ request, cookies })
	const session = await authRequest.validate()

	if (!session) {
		return NextResponse.json('Unauthorized or Logged out', {
			status: 401,
			headers,
		})
	}

	await auth.invalidateSession(session.sessionId)
	authRequest.setSession(null)

	// const redirectUrl = request.headers.get('host') ? `http://${request.headers.get('host')}` : '/sign-up'

	// return NextResponse.redirect(redirectUrl, { headers })
	return new Response(null, {
		status: 302,
		headers: {
			location: "/sign-in"
		}
	});
}