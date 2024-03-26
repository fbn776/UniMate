"use client";

import { FormEvent, useState } from "react";
import "./signup.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [course, setCourse] = useState("");
	const [subject, setSubject] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		let data = JSON.stringify({
			username,
			password,
			email,
			name,
			age,
			course,
			subject,
		});

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "http://localhost:5026/signup",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios
			.request(config)
			.then((response) => {
				if (response.status === 200) {
					localStorage.setItem("user", JSON.stringify(data));
					router.push("/login");
				} else {
					alert("User already exits");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<section className="w-full h-full login-screen">
			<div className="mt-36 mb-20 flex flex-col w-full items-center">
				<h1 className="text-center text-5xl mb-10 text-primary">Signup</h1>
				<form onSubmit={handleSubmit}>
					<div className="cont">
						<label>Name:</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="cont">
						<label>Username:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUserName(e.target.value)}
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
					<div className="cont">
						<label>Age:</label>
						<input
							type="number"
							value={age}
							onChange={(e) => setAge(parseFloat(e.target.value))}
						/>
					</div>
					<div className="cont">
						<label>Course:</label>
						<input
							type="text"
							value={course}
							onChange={(e) => setCourse(e.target.value)}
						/>
					</div>
					<div className="cont">
						<label>Subject:</label>
						<input
							type="text"
							value={subject}
							placeholder="Comma separated"
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>
					<div className="w-full flex justify-center mt-10">
						<button type="submit">Next</button>
					</div>

					<br></br>
					<br/>
					<br/>
				</form>
			</div>
		</section>
	);
}
