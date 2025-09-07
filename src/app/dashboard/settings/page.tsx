"use client";

import Input from "@/component/Input";
import Navbar from "@/component/Navbar";
import { AuthContext } from "@/contexts/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";

export default function UserSettings() {
	const { user } = useContext(AuthContext);

	const [isLoading, setIsLoading] = useState(user.id === -1);

	const [newUsername, setNewUsername] = useState(user.username);
	const [newPassword, setNewPassword] = useState("");

	const input = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setIsLoading(user.id === -1);
	}, [user]);

	return (
		<>
			<Navbar />

			<div className="w-[80%] bg-base-200 m-8 rounded-2xl justify-self-center p-4">
				<form action={(formData: FormData) => {}}>
					<Input
						title="Username"
						name="username"
						placeholder="Username"
						className="w-full"
						required
						defaultValue={user.username}
						onChange={(e) => setNewUsername(e.target.value.trim())}
						disabled={isLoading}
					/>

					<Input
						title="Password"
						name="password"
						placeholder="abc123"
						className="validator w-full"
						type="password"
						onChange={(e) => setNewPassword(e.target.value.trim())}
						disabled={isLoading}
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}"
						ref={input}
					>
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
					</Input>

					<button
						type="submit"
						className="btn bg-base-300 hover:bg-base-200 hover:border-1 hover:border-[#43475D] mt-4 w-xs"
						disabled={
							isLoading ||
							!input.current?.validity.valid ||
							(newUsername === user.username && newPassword === "")
						}
					>
						Save Changes
					</button>
				</form>
			</div>
		</>
	);
}
