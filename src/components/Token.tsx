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
		if (isCurrentSession) return;

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
                className={`font-bold text-lg text-text overflow-hidden text-ellipsis whitespace-nowrap flex mr-5 ${isCurrentSession ? "text-text/50" : ""}`}
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
					tabIndex={isCurrentSession ? -1 : 0}
					title={isCurrentSession ? "You cannot delete the token for the current session" : "Delete Token"}
                >
                    <span className={`material-symbols-rounded text-error`}>
                        delete
                    </span>
                </button>
            </div>
		</div>
	);
}
