"use client";

import { useCallback, useContext, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthProvider";
import { toast } from "react-toastify";

export default function Register() {
	const { updateUser } = useContext(AuthContext)

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const input = useRef<HTMLInputElement>(null);

	const createUser = useCallback(async (username: string, password: string) => {
		const promise = axios
			.post("/api/auth/register", {
				username,
				password
			})
			.then(updateUser);
		
		toast.promise(promise, {
			pending: "Creating account...",
			success: "Account created!",
			error: {
				render({ data }) {
					if (axios.isAxiosError(data) && data.response?.data?.error)
						return data.response.data.error;

					return "Failed to create user";
				},
			},
		});
	}, [updateUser])

	return (
		<div className="flex items-center justify-center min-h-screen">
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend className="fieldset-legend text-2xl">Register</legend>

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
						createUser(username, password);
					}}
				>
					Register
				</button>

				<p className="mt-4 text-base">
                    Already have an account?{" "}
                    <Link href="/login" className="link">Login</Link>
                </p>
			</fieldset>
		</div>
	);
}
