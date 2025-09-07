"use client";

import App from "@/component/App";
import Input from "@/component/Input";
import ModalButton from "@/component/ModalButton";
import Navbar from "@/component/Navbar";
import type schema from "@/db/schema";
import type { APIResponses } from "@/types/apiResponses";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
	const [allApps, setAllApps] = useState<(typeof schema.apps.$inferSelect)[]>([]);
    const [apps, setApps] = useState<(typeof schema.apps.$inferSelect)[]>([]);
	const [pinnedApps, setPinnedApps] = useState<
		(typeof schema.apps.$inferSelect)[]
	>([]);

	const fetchApps = useCallback(async () => {
		try {
			const res = await axios.get("/api/apps")
			
			if (res.status !== 200) toast.error("Failed to fetch apps");

			const apps = res.data as APIResponses["GET /apps"];

			setAllApps(apps);
		} catch (e) {
			console.error(e);
			
			toast.error("Failed to fetch apps");
		}
	}, [])

	function createApp(name: string) {
		const promiseRequest = axios
			.post("/api/apps", {
				name,
			})
			.then(fetchApps);

		toast.promise(promiseRequest, {
			pending: "Creating app...",
			success: "App created successfully",
			error: "Failed to create app",
		});
	}

	useEffect(() => {
		fetchApps();
	}, [fetchApps]);

	useEffect(() => {
		setPinnedApps(allApps.filter((app) => app.pinned));
        setApps(allApps.filter((app) => !app.pinned));
	}, [allApps]);

	return (
		<>
			<Navbar />

			<div className="flex justify-between">
				<h1 className="text-3xl font-bold p-2 ml-4">Apps</h1>

				<ModalButton modalId="add-app-modal">
					<h3 className="font-bold text-lg">Add New App</h3>

					<form action={async (formData) => {
						const name = formData.get("name")?.toString() as string;
						createApp(name);

						const modalId = "add-app-modal";

						const modal = document.getElementById(modalId) as HTMLDialogElement;

						modal.close();
					}}>
						<Input
							title="App Name"
							name="name"
							placeholder="My App"
							required
						/>

						<button
							type="submit"
							className="btn w-full rounded-lg"
						>
							Create App
						</button>
					</form>
				</ModalButton>
			</div>

			<div className="p-4">
				{pinnedApps.length > 0 && (
					<div>
						<h1 className="font-bold text-2xl mb-3">Pinned Apps</h1>

						<div className="flex flex-col gap-3">
							{pinnedApps.map((app) => (
								<App key={app.appId} app={app} updateApps={fetchApps} />
							))}
						</div>

						<div className="divider mb-1" />

						<h1 className="font-bold text-2xl mb-3">Apps</h1>
					</div>
				)}

				<div className="flex flex-col gap-3">
					{apps.length > 0 ? (
						apps.map((app) => <App key={app.appId} app={app} updateApps={fetchApps} />)
					) : (
						<div className="w-full flex justify-center items-center">
							<p className="text-center w-full text-2xl text-[var(--color-subtext2)] font-bold">
								No apps found
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
