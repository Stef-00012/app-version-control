import type schema from "@/db/schema";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
	token: string;
    isCurrentSession: boolean;
	updateUser: () => Promise<Omit<typeof schema.users.$inferSelect, "password">>;
}

export default function Token({
	token,
    isCurrentSession,
    updateUser,
}: Props) {
	async function deleteToken() {
		const requestPromise = axios
			.patch(`/api/users/me/tokens`, {
                token
            })
			.then(updateUser);

		toast.promise(requestPromise, {
			pending: `Deleting token...`,
			success: `Token deleted successfully`,
			error: `Failed to delete the token`,
		});
	}

    function copyToken() {
        navigator.clipboard.writeText(token);

        toast.success("Token copied to clipboard");
    }

	return (
		<div className="border border-[var(--color-overlay0)] p-4 rounded-lg shadow hover:shadow-md transition flex flex-row justify-between items-center">
            <h2
                className={`font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap flex mr-5 ${isCurrentSession ? "text-gray-500" : ""}`}
                title={token}
            >
                {token}
            </h2>

            <div className="gap-2 flex flex-row">
                <button
                    className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
                    type="button"
                    onClick={copyToken}
                >
                    <span className="material-symbols-rounded">
                        content_copy
                    </span>
                </button>

                <button
                    className={`btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1 ${isCurrentSession ? "opacity-50 cursor-not-allowed" : ""}`}
                    type="button"
                    onClick={deleteToken}
                    disabled={isCurrentSession}
                >
                    <span className={`material-symbols-rounded text-[var(--color-red)]`}>
                        delete
                    </span>
                </button>
            </div>

			{/* <div className="gap-2 flex flex-row">
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
						<Input
							title="Version Name"
							name="versionName"
							placeholder="v1.2.3"
							defaultValue={version.versionName}
							required
						/>

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
			</div> */}
		</div>
	);
}
