"use client";

import { IconSend2 } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./style.css";

import showdown from "showdown";

interface Chat {
	from: "user" | "ai";
	message: string;
}

const converter = new showdown.Converter();

function addChat(elm: HTMLDivElement, data: Chat) {
	if (!elm) return;
	const cont = document.createElement("div");
	const msg = document.createElement("p");


	msg.innerHTML = (converter.makeHtml(data.message));

	cont.setAttribute("data-from", data.from);

	cont.appendChild(msg);
	elm.appendChild(cont);

	elm.children[elm.children.length - 1].scrollIntoView({
		behavior: 'smooth'
	});
}

export default function Chat() {
	const textElm = useRef<HTMLInputElement | null>(null);
	const chatElm = useRef<HTMLDivElement>(null);

	const currUser = localStorage.getItem("is-logged");
	const route = useRouter();
	if (!currUser) {
		route.push("/login");
	}

	useEffect(() => {
		const src1 = axios.CancelToken.source();
		const src2 = axios.CancelToken.source();
		const src3 = axios.CancelToken.source();
		const src4 = axios.CancelToken.source();

		initialCall(src1, chatElm, "Welcome me", () => {
			initialCall(
				src1,
				chatElm,
				"Analyze the subjects and whats your take on it. If there are none, then make some up. That is make some general subjects up and analyze it.",
				() => {
					initialCall(
						src2,
						chatElm,
						"Suggest some text books for the subjects mentioned. If there are none, make some (and mention that). Even if you can't make some up and say it",
						() => {
							initialCall(
								src3,
								chatElm,
								"Give me a brief overview of the subjects mentioned. If there are none, say so.",
								() => {
									initialCall(
										src4,
										chatElm,
										"Provide me with a study time table. If there are none, then make some up. That is make some general time table for studying",
										() => {
											initialCall(
												null,
												chatElm,
												"Here's my analysis, now feel free to chat with me",
												() => {
													console.log("Done");
												},
												true
											);
										}
									);
								}
							);
						}
					);
				}
			);
		});

		return () => {
			src1.cancel("Request canceled due to use effect");
		};
	}, []);

	function sendText() {
		const text = textElm.current?.value;
		textElm.current!.value = "";
		if (text) {
			addChat(chatElm.current!, { from: "user", message: text });
			chatElm.current?.classList.add("loading");

			let data = JSON.stringify({
				data: JSON.parse(localStorage.getItem("user") || "{invalid: true}"),
				query: text,
			});

			let config = {
				method: "post",
				maxBodyLength: Infinity,
				url: "http://localhost:5026/chat",
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			};

			axios
				.request(config)
				.then((response) => {
					const data = response.data;
					chatElm.current?.classList.remove("loading");

					addChat(chatElm.current!, { from: "ai", message: data.response });
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	return (
		<section className="w-full h-full relative  bg-gray-100">
			<section className="h-[40px] px-6 flex items-center font-bold opacity-70 absolute top-0">
				UniMate
			</section>
			<div
				className="chats h-[calc(100%_-_60px_-_40px)] px-6 absolute top-[40px] overflow-y-scroll w-full"
				ref={chatElm}
			></div>
			<section className="absolute bottom-0 w-full h-[60px] flex pr-10 gap-10 justify-stretch shadow-lg">
				<input
					type="text"
					className="px-6 w-[100%] bg-slate-200"
					placeholder="Chat with me"
					ref={textElm}
				/>
				<button onClick={sendText}>
					<IconSend2 size="30" className="text-primary" />
				</button>
			</section>
		</section>
	);
}
function initialCall(
	source: any,
	chatElm: any,
	msg: string,
	callback: any,
	direct?: boolean
) {
	if (!direct) {
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "http://localhost:5026/chat",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				data: JSON.parse(localStorage.getItem("user") || "{invalid: true}"),
				query: msg,
			}),
			cancelToken: source.token,
		};

		axios
			.request(config)
			.then((response) => {
				const data = response.data;
				chatElm.current?.classList.remove("loading");

				addChat(chatElm.current!, { from: "ai", message: data.response });

				callback();
			})
			.catch((error) => {
				console.log(error);
			});
	} else {
		addChat(chatElm.current!, { from: "ai", message: msg });
	}
}
