"use client";

import type schema from "@/db/schema";
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
	user: Omit<typeof schema.users.$inferSelect, "password"> | null;
	updateUser: () => Promise<AuthData["user"]>;
}

export const AuthContext = createContext<AuthData>({
	user: null,
	updateUser: async () => null,
});

export default function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<AuthData["user"]>(null);
	const router = useRouter();
	const pathname = usePathname();

	const updateUser = useCallback(async () => {
		try {
			const userDataRes = await axios.get("api/users/me");

			const userData = userDataRes.data as AuthData["user"];

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
			setUser(null);

			return null;
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
