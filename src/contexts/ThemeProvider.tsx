"use client";

import { themeKeys } from "@/constants/themes";
import type { Theme } from "@/types/theme";
import {
	createContext,
	useState,
	useCallback,
	useMemo,
	useEffect,
	type ReactNode,
} from "react";
import { toast } from "react-toastify";

interface Props {
	children: ReactNode;
}

interface ThemeData {
	theme: Theme | null;
	updateTheme: () => void;
}

export const ThemeContext = createContext<ThemeData>({
	theme: null,
	updateTheme: () => {},
});

export default function ThemeProvider({ children }: Props) {
	const [theme, setTheme] = useState<Theme | null>(null);

	const updateTheme = useCallback(() => {
		try {
			const theme = localStorage.getItem("theme");

			if (!theme) {
				return setTheme(null);
			}

			const themeJSON = JSON.parse(theme) as Theme;

			setTheme(themeJSON);

			return themeJSON;
		} catch (e) {
			toast.error("Failed to load theme");
			console.error(e);

			return setTheme(null);
		}
	}, []);

	const themeData = useMemo<ThemeData>(
		() => ({
			theme,
			updateTheme,
		}),
		[theme, updateTheme],
	);

	useEffect(() => {
		updateTheme();
	}, [updateTheme]);

	useEffect(() => {
		for (const key of themeKeys) {
			if (theme?.colors?.[key]) document.documentElement.style.setProperty(
				`--color-${key}`,
				theme.colors[key]
			);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
	);
}
