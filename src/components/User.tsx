import type schema from "@/db/schema";
import axios from "axios";
import { toast } from "react-toastify";
import ModalButton from "./ModalButton";
import Toggle from "./Toggle";
import Input from "./Input";

interface Props {
	user: typeof schema.users.$inferSelect;
	updateUsers: () => Promise<void>;
}

export default function User({
	user,
	updateUsers,
}: Props) {
	async function deleteUser() {
		const requestPromise = axios
			.delete(`/api/users/${user.id}`)
			.then(updateUsers);

		toast.promise(requestPromise, {
			pending: `Deleting user...`,
			success: `User deleted successfully`,
			error: `Failed to delete the user`,
		});
	}

    interface UserData {
        username?: string;
        password?: string;
        admin?: boolean;
    }

	async function editUser(userData: UserData) {
		const requestPromise = axios
			.patch(`/api/users/${user.id}`, userData)
			.then(updateUsers);

		toast.promise(requestPromise, {
			pending: `Updating user...`,
			success: `User updated successfully`,
			error: {
				render({ data }) {
					if (axios.isAxiosError(data) && data.response?.data?.error)
						return data.response.data.error;

					return "Failed to update user";
				},
			},
		});
	}

	return (
		<div className="border border-[var(--color-overlay0)] p-4 rounded-lg shadow hover:shadow-md transition flex flex-row justify-between items-center">
			<h2 className="font-bold text-2xl">{user.username}</h2>

			<div className="gap-2 flex flex-row">
				<ModalButton
					modalId={`edit-user-modal_${user.id}`}
					openButtonStyle="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					openButtonContent={
						<span className="material-symbols-rounded text-primary-content">
							edit
						</span>
					}
				>
					<h3 className="font-bold text-lg">Update User</h3>

					<form
						action={async (formData) => {
							const username = formData
								.get("username")
								?.toString() as string;

                            const password = formData
                                .get("password")
                                ?.toString() as string;

                            const admin = formData
                                .get("admin")
                                ?.toString() === "on";

                            const editData: UserData = {};

                            if (username !== user.username) editData.username = username;
                            if (password) editData.password = password;
                            if (admin !== user.admin) editData.admin = admin;

							editUser(editData);

							const modalId = `edit-user-modal_${user.id}`;

							const modal = document.getElementById(
								modalId,
							) as HTMLDialogElement;

							modal.close();
						}}
					>
						<Input
							title="Username"
							name="username"
							placeholder="My User"
							defaultValue={user.username}
						/>

                        <Input
							title="Password"
							name="username"
                            type="password"
							placeholder="abc123"
						/>

                        <Toggle
                            label="Admin"
                            name="admin"
                            toggled={user.admin}
                        />

						<button type="submit" className="btn w-full rounded-lg">
							Update User
						</button>
					</form>
				</ModalButton>

				<button
					className="btn btn-ghost btn-base-300 p-2 rounded-md border-2 border-base-300 px-1"
					type="button"
					onClick={deleteUser}
				>
					<span className="material-symbols-rounded text-red">
						delete
					</span>
				</button>
			</div>
		</div>
	);
}
