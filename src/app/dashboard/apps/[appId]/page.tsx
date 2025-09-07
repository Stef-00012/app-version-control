"use client";

import Input from "@/component/Input";
import ModalButton from "@/component/ModalButton";
import Navbar from "@/component/Navbar";
import Version from "@/component/Version";
import type schema from "@/db/schema";
import type { APIResponses } from "@/types/apiResponses";
import axios from "axios";
import { use, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AppView({
	params,
}: {
	params: Promise<{ appId: string }>;
}) {
	const { appId } = use(params);

	const [app, setApp] = useState<typeof schema.apps.$inferSelect>();
	const [platforms, setPlatforms] = useState<(typeof schema.platforms.$inferSelect)[]>([]);

	const [allVersions, setAllVersions] = useState<
		(typeof schema.versions.$inferSelect)[]
	>([]);
	const [versions, setVersions] = useState<
		(typeof schema.versions.$inferSelect)[]
	>([]);
	const [pinnedVersions, setPinnedVersions] = useState<
		(typeof schema.versions.$inferSelect)[]
	>([]);

	const fetchApp = useCallback(async () => {
		try {
			const res = await axios.get(`/api/apps/${appId}`);

			if (res.status !== 200) toast.error("Failed to fetch apps");

			const app = res.data as APIResponses["GET /apps/:id"];

			setApp(app);
		} catch (e) {
			console.error(e);

			toast.error("Failed to fetch apps");
		}
	}, [appId]);

	const fetchVersions = useCallback(async () => {
		try {
			const res = await axios.get(`/api/apps/${appId}/versions`);

			if (res.status !== 200) toast.error("Failed to fetch versions");

			const versions = res.data as APIResponses["GET /apps/:id/versions"];

			setAllVersions(versions);
		} catch (e) {
			console.error(e);

			toast.error("Failed to fetch versions");
		}
	}, [appId]);

    const fetchPlatforms = useCallback(async () => {
		try {
			const res = await axios.get(`/api/platforms`);

			if (res.status !== 200) toast.error("Failed to fetch platforms");

			const platforms = res.data as APIResponses["GET /platforms"];

			setPlatforms(platforms);
		} catch (e) {
			console.error(e);

			toast.error("Failed to fetch platforms");
		}
	}, []);

	function createVersion(versionName: string, versionCode: string) {
		const promiseRequest = axios
			.post(`/api/apps/${appId}/versions`, {
				versionCode,
				versionName,
			})
			.then(fetchVersions);

		toast.promise(promiseRequest, {
			pending: "Creating version...",
			success: "Version created successfully",
			error: {
				render({ data }) {
					if (axios.isAxiosError(data) && data.response?.data?.error)
						return data.response.data.error;

					return "Failed to create version";
				},
			},
		});
	}

	useEffect(() => {
		fetchApp();
		fetchVersions();
        fetchPlatforms();
	}, [fetchApp, fetchVersions, fetchPlatforms]);

	useEffect(() => {
		setPinnedVersions(allVersions.filter((version) => version.pinned));
		setVersions(allVersions.filter((version) => !version.pinned));
	}, [allVersions]);

	return (
		<>
			<Navbar />

			<div className="flex justify-between">
				<h1 className="text-3xl font-bold p-2 ml-4">Versions - {app?.appName || "Loading..."}</h1>

				<ModalButton modalId="create-version-modal">
					<h3 className="font-bold text-lg">Add New Version</h3>

					<form
						action={async (formData) => {
							const versionName = formData
								.get("versionName")
								?.toString() as string;
							const versionCode = formData
								.get("versionCode")
								?.toString() as string;

							createVersion(versionName, versionCode);

							const modalId = "create-version-modal";

							const modal = document.getElementById(
								modalId,
							) as HTMLDialogElement;

							modal.close();
						}}
					>
						<Input
							title="Version Name"
							name="versionName"
							placeholder="v1.2.3"
							required
						/>

						<Input
							title="Version Code"
							name="versionCode"
							type="number"
							placeholder="123"
							required
						/>

						<button type="submit" className="btn w-full rounded-lg">
							Create Version
						</button>
					</form>
				</ModalButton>
			</div>

			<div className="p-4">
				{pinnedVersions.length > 0 && (
					<div>
						<h1 className="font-bold text-2xl mb-3">Pinned Versions</h1>

						<div className="flex flex-col gap-3">
							{pinnedVersions.map((version) => (
								<Version
                                    platforms={platforms}
									key={version.versionCode}
									appId={appId}
									version={version}
									updateVersions={fetchVersions}
								/>
							))}
						</div>

						<div className="divider mb-1" />

						<h1 className="font-bold text-2xl mb-3">Versions</h1>
					</div>
				)}

				<div className="flex flex-col gap-3">
					{versions.length > 0 ? (
						versions.map((version) => (
							<Version
                                platforms={platforms}
								key={version.versionCode}
								appId={appId}
								version={version}
								updateVersions={fetchVersions}
							/>
						))
					) : (
						<div className="w-full flex justify-center items-center">
							<p className="text-center w-full text-2xl text-[var(--color-subtext2)] font-bold">
								No versions found
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
