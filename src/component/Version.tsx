import type schema from "@/db/schema";
import axios from "axios";
import { toast } from "react-toastify";
import ModalButton from "./ModalButton";
import Toggle from "./Toggle";
import type { VersionPlatforms } from "@/types/db";

interface Props {
	appId: string;
	version: typeof schema.versions.$inferSelect;
	platforms: (typeof schema.platforms.$inferSelect)[];
	updateVersions: () => Promise<void>;
}

export default function Version({
	appId,
	version,
	updateVersions,
	platforms,
}: Props) {
	async function togglePin() {
		const requestPromise = axios
			.patch(`/api/apps/${appId}/versions/${version.versionCode}/pin`, {
				pinned: !version.pinned,
			})
			.then(updateVersions);

		toast.promise(requestPromise, {
			pending: `${version.pinned ? "Unpinning" : "Pinning"} version...`,
			success: `Version ${version.pinned ? "unpinned" : "pinned"} successfully`,
			error: `Failed to ${version.pinned ? "unpin" : "pin"} the version`,
		});
	}

	async function deleteVersion() {
		const requestPromise = axios
			.delete(`/api/apps/${appId}/versions/${version.versionCode}`)
			.then(updateVersions);

		toast.promise(requestPromise, {
			pending: `Deleting version...`,
			success: `Version deleted successfully`,
			error: `Failed to delete the version`,
		});
	}

	async function editVersion(versionName: string, newPlatforms: VersionPlatforms) {
		const requestPromise = axios
			.patch(`/api/apps/${appId}/versions/${version.versionCode}`, {
				versionName,
				platforms: newPlatforms,
			})
			.then(updateVersions);

		toast.promise(requestPromise, {
			pending: `Updating version...`,
			success: `Version updated successfully`,
			error: {
				render({ data }) {
					if (axios.isAxiosError(data) && data.response?.data?.error)
						return data.response.data.error;

					return "Failed to update version";
				},
			},
		});
	}

	return (
		<div className="border border-[var(--color-overlay0)] p-4 rounded-lg shadow hover:shadow-md transition flex flex-row justify-between items-center">
			<h2 className="font-bold text-2xl">{version.versionName}</h2>

			<div className="gap-2 flex flex-row">
				<ModalButton
					modalId={`edit-version-modal_${version.versionCode}`}
					openButtonStyle="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					openButtonContent={
						<span className="material-symbols-rounded text-primary-content">
							edit
						</span>
					}
				>
					<h3 className="font-bold text-lg">Update Version</h3>

					<form
						action={async (formData) => {
							const versionName = formData
								.get("versionName")
								?.toString() as string;

							const newPlatforms: VersionPlatforms = {};
							const platformsId = platforms.map((platform) => platform.id)

							for (const platformId of platformsId) {
								newPlatforms[platformId] = formData.get(platformId)?.toString() === "on";
							}

							editVersion(versionName, newPlatforms);

							const modalId = `edit-version-modal_${version.versionCode}`;

							const modal = document.getElementById(
								modalId,
							) as HTMLDialogElement;

							modal.close();
						}}
					>
						<fieldset className="fieldset">
							<legend className="fieldset-legend">Version Name</legend>
							<input
								name="versionName"
								type="text"
								className="input rounded-lg! w-full"
								placeholder="v1.2.3"
								defaultValue={version.versionName}
								required
							/>
						</fieldset>

						{platforms.map((platform) => (
							<div className="my-1" key={platform.id}>
								<Toggle label={platform.name} name={platform.id} toggled={version.platforms[platform.id]} />
							</div>
						))}

						<button type="submit" className="btn w-full rounded-lg">
							Update Version
						</button>
					</form>
				</ModalButton>

				<button
					className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					type="button"
					onClick={togglePin}
				>
					<span
						className={`material-symbols-rounded ${version.pinned ? "[font-variation-settings:'FILL'_1]" : ""}`}
					>
						keep
					</span>
				</button>

				<button
					className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					type="button"
					onClick={deleteVersion}
				>
					<span className="material-symbols-rounded text-[var(--color-red)]">
						delete
					</span>
				</button>
			</div>
		</div>
	);
}
