"use client";

import App from "@/component/App";
import ModalButton from "@/component/ModalButton";
import Navbar from "@/component/Navbar";
import type schema from "@/db/schema";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
	const [allApps, setAllApps] = useState<(typeof schema.apps.$inferSelect)[]>([]);
    const [apps, setApps] = useState<(typeof schema.apps.$inferSelect)[]>([]);
	const [pinnedApps, setPinnedApps] = useState<
		(typeof schema.apps.$inferSelect)[]
	>([]);

	useEffect(() => {
		axios
			.get("/api/apps")
			.then((res) => {
				setAllApps(res.data);
			})
			.catch(console.error);
	}, []);

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

					<form
						action={async (formData) => {
							const name = formData.get("name")?.toString() as string;

							try {
								const res = await axios.post("/api/apps", {
									name,
								});

								const data = res.data as typeof schema.apps.$inferSelect;

								setApps((prev) => [...prev, data]);

								toast.success("App created successfully");
							} catch (e) {
								console.error(e);

								toast.error("Failed to create app");
							}
						}}
					>
						<fieldset className="fieldset">
							<legend className="fieldset-legend">App Name</legend>
							<input
								name="name"
								type="text"
								className="input rounded-lg! w-full"
								placeholder="My App"
								required
							/>
						</fieldset>

						<button type="submit" className="btn w-full rounded-lg">
							Create App
						</button>
					</form>
				</ModalButton>
			</div>

			<div className="p-4">
				{pinnedApps.length > 0 && (
					<div>
						<h1 className="font-bold text-2xl">Pinned Apps</h1>

						{pinnedApps.map((app) => (
							<App key={app.appId} app={app} />
						))}

						<div className="divider" />
					</div>
				)}

				{apps.length > 0 ? (
					apps.map((app) => <App key={app.appId} app={app} />)
				) : (
					<div className="w-full flex justify-center items-center">
						<p className="text-center w-full text-2xl text-[var(--color-subtext2)] font-bold">
							No apps found
						</p>
					</div>
				)}
			</div>
		</>
	);
}
