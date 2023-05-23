"use client"
import { useRouter } from "next/navigation";
import React from "react";

export default function SignIn() {
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const response = await fetch("/api/sign-in", {
				method: "POST",
				body: JSON.stringify({
					email,
					password
				}),
			});

			if (response.redirected) return router.push(response.url);
		} catch (e) {
			console.log(e)
		}
	};

	return (
		<div className="min-h-full w-full flex flex-grow justify-center items-center">
			<div className="">
			<h1 className="text-whiteish">Sign into an account</h1>
			<form method="post" onSubmit={handleSubmit} action="/api/sign-up">
				<label className="text-whiteish" htmlFor="email">email</label>
				<br />
				<input  id="email" name="email" />
				<br />
				<label className="text-whiteish" htmlFor="password">password</label>
				<br />
				<input type="password" id="password" name="password" />
				<br />
				<input type="submit" value="Sign In" className="button text-whiteish" />
			</form>
			</div>
		</div>
	);
};