"use client";

import Input from "@/components/Input";
import ModalButton from "@/components/ModalButton";
import Navbar from "@/components/Navbar";
import Toggle from "@/components/Toggle";
import User from "@/components/User";
import { AuthContext } from "@/contexts/AuthProvider";
import type schema from "@/db/schema";
import type { APIResponses } from "@/types/apiResponses";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function adminUsers() {
    const router = useRouter();

    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState<(typeof schema.users.$inferSelect)[]>([]);

    const fetchUsers = useCallback(async () => {
		try {
			const res = await axios.get("/api/users");
			
			if (res.status !== 200) toast.error("Failed to fetch users");

			const users = res.data as APIResponses["GET /users"];

			setUsers(users);
		} catch (e) {
			console.error(e);
			
			toast.error("Failed to fetch users");
		}
	}, [])

    function createUser(username: string, password: string, admin: boolean) {
		const promiseRequest = axios
			.post("/api/users", {
				username,
                password,
                admin,
			})
			.then(fetchUsers);

		toast.promise(promiseRequest, {
			pending: "Creating user...",
			success: "User created successfully",
			error: "Failed to create user",
		});
	}

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    useEffect(() => {
        if (user.id !== -1 && !user.admin) router.push("/dashboard");
    }, [user, router])

    return (
        <>
            <Navbar />

            <div className="flex justify-between">
                <h1 className="text-3xl font-bold p-2 ml-4">Users</h1>

                <ModalButton modalId="add-user-modal">
                    <h3 className="font-bold text-lg">Add New User</h3>

                    <form action={async (formData) => {
                        const username = formData.get("username")?.toString() as string;
                        const password = formData.get("password")?.toString() as string;
                        const admin = formData.get("admin")?.toString() === "on" as string;

                        createUser(username, password, admin);

                        const modalId = "add-app-modal";

                        const modal = document.getElementById(modalId) as HTMLDialogElement;

                        modal.close();
                    }}>
                        <Input
                            title="Username"
                            name="username"
                            placeholder="My User"
                            required
                        />

                        <Input
                            title="Password"
                            name="password"
                            placeholder="abc123"
                            required
                        />

                        <Toggle
                            label="Admin"
                            name="admin"
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
                <div className="flex flex-col gap-3">
                    {users.length > 0 ? (
                        users
                            .filter((usr) => usr.id !== user.id)
                            .map((usr) => <User key={usr.id} user={usr} updateUsers={fetchUsers} />)
                    ) : (
                        <div className="w-full flex justify-center items-center">
                            <p className="text-center w-full text-2xl text-overlay2 font-bold">
                                No user found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}