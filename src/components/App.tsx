import type schema from "@/db/schema";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ModalButton from "./ModalButton";
import Input from "./Input";

interface Props {
	app: typeof schema.apps.$inferSelect;
	updateApps: () => Promise<void>
}

export default function App({ app, updateApps }: Props) {
	const appUrl = `/dashboard/apps/${app.appId}`;
	const router = useRouter();

	async function togglePin() {
		const requestPromise = axios
			.patch(`/api/apps/${app.appId}/pin`, {
				pinned: !app.pinned,
			})
			.then(updateApps)
		
		toast.promise(requestPromise, {
			pending: `${app.pinned ? "Unpinning" : "Pinning"} app...`,
			success: `App ${app.pinned ? "unpinned" : "pinned"} successfully`,
			error: `Failed to ${app.pinned ? "unpin" : "pin"} the app`,
		})
	}

	async function deleteApp() {
		const requestPromise = axios
			.delete(`/api/apps/${app.appId}`)
			.then(updateApps)
		
		toast.promise(requestPromise, {
			pending: `Deleting app...`,
			success: `App deleted successfully`,
			error: `Failed to delete the app`,
		})
	}

	async function renameApp(name: string) {
		const requestPromise = axios
			.patch(`/api/apps/${app.appId}`, {
				name
			})
			.then(updateApps)
		
		toast.promise(requestPromise, {
			pending: `Updating app...`,
			success: `App updated successfully`,
			error: `Failed to update the app`,
		})
	}

	function openApp() {
		return router.push(appUrl);
	}

	return (
		<div className="border border-[var(--color-overlay0)] p-4 rounded-lg shadow hover:shadow-md transition flex flex-row justify-between items-center">
			<Link href={appUrl}>
				<h2 className="font-bold text-2xl">{app.appName}</h2>
			</Link>

			<div className="gap-2 flex flex-row">
				<button
					className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					type="button"
					onClick={openApp}
				>
					<span className="material-symbols-rounded">keyboard_arrow_right</span>
				</button>

				<ModalButton
					modalId={`edit-app-modal_${app.appId}`}
					openButtonStyle="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					openButtonContent={
						<span className="material-symbols-rounded text-primary-content">
							edit
						</span>
					}
				>
					<h3 className="font-bold text-lg">Update App</h3>

					<form
						action={async (formData) => {
							const appName = formData
								.get("name")
								?.toString() as string;

							renameApp(appName);

							const modalId = `edit-app-modal_${app.appId}`;

							const modal = document.getElementById(
								modalId,
							) as HTMLDialogElement;

							modal.close();
						}}
					>
						<Input
							title="App Name"
							name="name"
							placeholder="My App"
							defaultValue={app.appName}
							required
						/>

						<button type="submit" className="btn w-full rounded-lg">
							Update App
						</button>
					</form>
				</ModalButton>

				<button
					className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					type="button"
					onClick={togglePin}
				>
					<span
						className={`material-symbols-rounded ${app.pinned ? "[font-variation-settings:'FILL'_1]" : ""}`}
					>
						keep
					</span>
				</button>

				<button
					className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					type="button"
					onClick={deleteApp}
				>
					<span className="material-symbols-rounded text-red">delete</span>
				</button>
			</div>
		</div>
	);
}
