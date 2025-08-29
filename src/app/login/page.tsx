"use client";

import { useContext, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthProvider";

export default function Login() {
	const { updateUser } = useContext(AuthContext)

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const input = useRef<HTMLInputElement>(null);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend className="fieldset-legend text-2xl">Login</legend>

				{error && <p className="text-error text-lg">{error}</p>}

				<label className="label text-base" htmlFor="username">
					Username
				</label>
				<input
					type="text"
					required
					className="input rounded-lg!"
					placeholder="Username"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>

				<label className="label text-base" htmlFor="password">
					Password
				</label>
				<input
					type="password"
					required
					className="input rounded-lg! validator"
					minLength={10}
					ref={input}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}"
					placeholder="Password"
					title="Must be atleast 10 characters, including number, lowercase letter, uppercase letter"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				{input.current && !input.current.validity.valid && (
					<p className="text-error">
						Must be atleast 10 characters, including
						<br />
						At least one number
						<br />
						At least one lowercase letter
						<br />
						At least one uppercase letter
					</p>
				)}

				<button
					className="btn btn-neutral-content text-white rounded-lg mt-4"
					type="submit"
					onClick={async () => {
						setError(null);

						try {
							const res = await axios.post("/api/auth/login", {
								username,
								password,
							});

							if (res.status === 204) {
								await updateUser()
							} else {
								setError("invalid username or password");
							}
						} catch (e) {
							console.error(e);

							setError("invalid username or password");
						}
					}}
				>
					Login
				</button>

                <p className="mt-4 text-base">
                    Don't have an account?{" "}
                    <Link href="/register" className="link">Register</Link>
                </p>
			</fieldset>
		</div>
	);
}
