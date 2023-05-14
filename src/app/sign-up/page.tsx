"use client"
import Link from "next/link";
// import { useRouter } from "next/router";
import React from "react";

export default function SignUp() {
	// const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const response = await fetch("/api/sign-up", {
				method: "POST",
				body: JSON.stringify({
					email,
					password
				})
			});
		} catch (e) {
			console.log(e)
		}
		// if (response.redirected) return router.push(response.url); // redirect on redirect responses
	};

	const signOut = () => {
		fetch("/api/sign-out", {
			method: "POST"
		});
	}

	return (
		<div className="min-h-full w-full flex flex-grow justify-center items-center">
			<div className="">
			<h1 className="text-whiteish">Create a new account</h1>
			<form method="post" onSubmit={handleSubmit} action="/api/sign-up">
				<label className="text-whiteish" htmlFor="email">email</label>
				<br />
				<input  id="email" name="email" />
				<br />
				<label className="text-whiteish" htmlFor="password">password</label>
				<br />
				<input type="password" id="password" name="password" />
				<br />
				<input type="submit" value="Continue" className="button text-whiteish" />
			</form>
			<Link href="/sign-in" className="link">
				Sign in
			</Link>

			<button onClick={signOut} className="text-whiteish">Sign Out</button>
			</div>
		</div>
	);
};