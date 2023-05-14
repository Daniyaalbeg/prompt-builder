import { auth } from "@/auth/lucia";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const headers = new Headers()

	const authRequest = auth.handleRequest(req, headers)
	const session = await authRequest.validate()

	if (!session) {
		return NextResponse.json('Unauthorized or Logged out', {
			status: 401,
			headers,
		})
	}

	await auth.invalidateSession(session.sessionId)
	authRequest.setSession(null)

	const redirectUrl = req.headers.get('host') ? `http://${req.headers.get('host')}` : '/sign-up'

	console.log(redirectUrl)

	return NextResponse.redirect(redirectUrl, { headers })
}