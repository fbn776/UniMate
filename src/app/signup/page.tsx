"use client";

import { useState } from "react";
import "./signup.css";
import Link from "next/link";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	//const router = useRouter();

	const handleSubmit = async () => {
		//e.preventDefault();
		//router.push("/dashboard");
	};

	return (
		<section className="w-full h-full flex flex-col justify-center items-center login-screen">
			<div>
				<h1 className="text-center text-5xl mb-10 text-primary">Signup</h1>
				<form onSubmit={handleSubmit}>
					<div className="cont">
						<label>Name:</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
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
					<div className="w-full flex justify-center mt-10">
						<button type="submit">Next</button>
					</div>
				</form>
			</div>
		</section>
	);
}
