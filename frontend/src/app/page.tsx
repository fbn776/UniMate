/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Home() {
	return (
		<main className="p-10 main-bg text-white flex w-full h-full justify-center items-center">
      
			<img
        alt="Main background"
				src="/bg.jpeg"
				className="fixed top-0 left-0 right-0 bottom-0 w-full -z-20"
			></img>

			<div className="fixed top-0 left-0 right-0 bottom-0 w-full -z-10 bg-[rgba(0,0,0,0.8)]"></div>
			<div className="max-w-[50%]">
				<h1 className="text-primary font-bold text-5xl mb-8">UniMate</h1>
				<p className="py-4">
					UniMate is your go-to companion for navigating college life smoothly
					and effortlessly. Designed with college students in mind, Unimate
					simplifies your daily routines, helps you stay organized, and empowers
					you to excel in your academic journey
				</p>

						<h3 className="mb-6 text-1xl">Already a user?</h3>
						<Link
							className="px-6 py-3 bg-primary rounded text-white"
							href="/login"
						>
							Login
						</Link>
						<h3 className="mb-6 mt-8 text-1xl">Not a user?</h3>
						<Link
							className="px-6 py-3 bg-primary rounded text-white"
							href="/signup"
						>
							Signup
						</Link>
			</div>
		</main>
	);
}
