"use client";

import { useState } from "react";
// import { useRouter } from "next/router";
import "./login.css"
import Link from "next/link";


export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//const router = useRouter();

	const handleSubmit = async () => {
		//e.preventDefault();
		//router.push("/dashboard");
	};

	return (
		<section className="w-full h-full flex flex-col justify-center items-center login-screen">
			<div>
				<h1 className="text-center text-5xl mb-10 text-primary">Login</h1>
				<form onSubmit={handleSubmit}>
					<div className="cont">
						<label>Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="cont">
						<label>Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="text-right w-full">
						<Link className="text-blue-600 text-sm" href="/signup">Not registered?</Link>
					</div>
					<div className="w-full flex justify-center mt-10">
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		</section>
	);
}
