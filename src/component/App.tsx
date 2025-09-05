import type schema from "@/db/schema";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
	app: typeof schema.apps.$inferSelect;
}

export default function App({ app }: Props) {
	async function togglePin() {
		try {
			await axios.patch(`/api/apps/${app.appId}/pin`, {
				pinned: !app.pinned,
			});

			app.pinned = !app.pinned;

			toast.success(`App ${app.pinned ? "pinned" : "unpinned"} successfully`);
		} catch (e) {
			console.error(e);

			toast.error("Failed to update pin status");
		}
	}

	function openApp() {
		return redirect(`./app/${app.appId}`);
	}

	return (
		<div className="border border-[var(--color-overlay0)] p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer flex flex-row justify-between items-center">
			<Link href={`./app/${app.appId}`}>
				<h2 className="font-bold text-2xl">{app.appName}</h2>
			</Link>

			<div className="gap-2 flex flex-row">
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
					onClick={openApp}
				>
					<span className="material-symbols-rounded text-[var(--color-red)]">delete</span>
				</button>

				<button
					className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					type="button"
					onClick={openApp}
				>
					<span className="material-symbols-rounded">keyboard_arrow_right</span>
				</button>
			</div>
		</div>
	);
}
