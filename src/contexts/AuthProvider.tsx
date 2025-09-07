"use client";

import type schema from "@/db/schema";
import type { APIResponses } from "@/types/apiResponses";
import axios, { type AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
	createContext,
	useState,
	useCallback,
	useMemo,
	useEffect,
	type ReactNode,
} from "react";

interface Props {
	children: ReactNode;
}

interface AuthData {
	user: Omit<typeof schema.users.$inferSelect, "password">;
	updateUser: () => Promise<AuthData["user"]>;
}

const defaultLoadingUser: AuthData["user"] = {
	id: -1,
	username: "Loading...",
	admin: false,
	tokens: [],
}

export const AuthContext = createContext<AuthData>({
	user: defaultLoadingUser,
	updateUser: async () => defaultLoadingUser,
});

export default function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<AuthData["user"]>(defaultLoadingUser);
	const router = useRouter();
	const pathname = usePathname();

	const updateUser = useCallback(async () => {
		try {
			const userDataRes = await axios.get("/api/users/me");

			const userData = userDataRes.data as APIResponses["GET /users/me"];

			setUser(userData);

			if (["/login", "/register", "/"].includes(pathname) && userData)
				router.replace("/dashboard");
			if (!userData && !["/login", "/register"].includes(pathname))
				router.replace("/login");

			return userData;
		} catch (e) {
			const error = e as AxiosError;

			if (error.status !== 401) console.error(error);

			if (!["/login", "/register"].includes(pathname)) router.replace("/login");
			setUser(defaultLoadingUser);

			return defaultLoadingUser;
		}
	}, [pathname, router]);

	const authData = useMemo<AuthData>(
		() => ({
			user,
			updateUser,
		}),
		[user, updateUser],
	);

	useEffect(() => {
		updateUser();
	}, [updateUser]);

	return (
		<AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
	);
}
