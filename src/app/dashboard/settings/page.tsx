"use client";

import Input from "@/component/Input";
import Navbar from "@/component/Navbar";
import Token from "@/component/Token";
import { AuthContext } from "@/contexts/AuthProvider";
import type { APIResponses } from "@/types/apiResponses";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function UserSettings() {
	const { user, updateUser } = useContext(AuthContext);

	const [isLoading, setIsLoading] = useState(user.id === -1);

	const [newUsername, setNewUsername] = useState(user.username);
	const [newPassword, setNewPassword] = useState("");

	const [sessionToken, setSessionToken] = useState("");

	const input = useRef<HTMLInputElement>(null);

	const updateSelfUser = useCallback(
		async ({
			username,
			password,
		}: {
			username?: string;
			password?: string;
		}) => {
			setIsLoading(true);

			const requestPromise = axios
				.patch("/api/users/me", {
					username,
					password,
				})
				.then(updateUser);

			await toast.promise(requestPromise, {
				pending: "Updating user...",
				success: "User updated",
				error: {
					render({ data }) {
						if (axios.isAxiosError(data) && data.response?.data?.error)
							return data.response.data.error;

						return "Failed to update user";
					},
				},
			});

			setIsLoading(false);
		},
		[updateUser],
	);

	const createToken = useCallback(
		async () => {
			const requestPromise = axios
				.post("/api/users/me/tokens")
				.then(updateUser);

			await toast.promise(requestPromise, {
				pending: "Creating token...",
				success: "Token created",
				error: {
					render({ data }) {
						if (axios.isAxiosError(data) && data.response?.data?.error)
							return data.response.data.error;

						return "Failed to create token";
					},
				},
			});
		},
		[updateUser],
	);

	useEffect(() => {
		setIsLoading(user.id === -1);
	}, [user]);

	useEffect(() => {
		axios
			.get("/api/users/me/sessionToken")
			.then((res) => {
				const data = res.data as APIResponses["GET /users/me/sessionToken"];

				const token = data.token;

				setSessionToken(token);
			})
			.catch(console.error);
	});

	return (
		<>
			<Navbar />

			<div className="w-[60%] bg-base-200 m-8 rounded-2xl justify-self-center p-4">
				<h1 className="text-3xl font-bold">User Settings</h1>

				<form
					action={(formData: FormData) => {
						const username =
							formData.get("username")?.toString().trim() || undefined;
						const password =
							formData.get("password")?.toString().trim() || undefined;

						updateSelfUser({ username, password });

						setNewPassword("");
					}}
				>
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
						value={newPassword}
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
						className="btn bg-base-300 hover:bg-base-200 hover:border-1 hover:border-[#43475D] mt-4 md:w-xs w-full"
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

			<div className="w-[60%] bg-base-200 m-8 rounded-2xl justify-self-center p-4">
				<div className="flex justify-between">
					<h1 className="text-3xl font-bold">Tokens</h1>

					<button
						type="button"
						className="btn bg-base-300 hover:bg-base-200 hover:border-1 hover:border-[#43475D] p-2 mb-3 rounded-md"
						onClick={createToken}
					>
						<span className="material-symbols-rounded text-primary-content">add</span>
					</button>
				</div>

				<div className="flex flex-col gap-3">
					{user.tokens.map((token) => (
						<Token key={token} token={token} updateUser={updateUser} isCurrentSession={token === sessionToken} />
					))}
				</div>
			</div>
		</>
	);
}
