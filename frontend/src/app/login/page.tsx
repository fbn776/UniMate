"use client";

import { FormEvent, useState } from "react";
import "./login.css";
import Link from "next/link";
import axios from "axios";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation"
import { json } from "stream/consumers";

const backendURL = process.env.backend;

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorVisible, setErrorVisible] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		let data = JSON.stringify({
			username: username,
			password: password,
		});

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "http://localhost:5026/login",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios
			.request(config)
			.then((response) => {
				const data = response.data;
				if (response.status === 200) {
					localStorage.setItem("is-logged", JSON.stringify({logged: true}));
					
					router.push('/chat');
				} else {
					setErrorVisible(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<section className="w-full h-full flex flex-col justify-center items-center login-screen">
			<div>
				<h1 className="text-center text-5xl mb-10 text-primary">Login</h1>
				<form onSubmit={handleSubmit}>
					<div className="cont">
						<label>Username:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
						<Link className="text-blue-600 text-sm" href="/signup">
							Not registered?
						</Link>
					</div>
					<div className="w-full flex justify-center mt-10">
						<button type="submit" onSubmit={handleSubmit}>
							Login
						</button>
					</div>
				</form>
			</div>

			<div
				className={`${
					errorVisible ? "" : "hidden"
				} fixed w-[80%] h-auto shadow-lg p-10 bg-slate-300 rounded`}
			>
				<h1 className="text-2xl mb-4">Invalid Username or Password</h1>
				<p>Make sure you have entered the correct username and password.</p>
				<p className="mb-6">If you are not already a user try signing up.</p>
				<Link
					href="/signup"
					className="bg-primary px-5 py-2 rounded text-white"
				>
					Sign up
				</Link>

				<IconX
					className="absolute top-10 right-10"
					onClick={() => {
						setErrorVisible(false);
					}}
				/>
			</div>
		</section>
	);
}
