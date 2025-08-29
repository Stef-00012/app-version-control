import type { Viewport } from "next";
import "./globals.css";
import AuthProvider from "@/contexts/AuthProvider";

// export const dynamic = "force-static";

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#629D6D",
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html data-theme="catppuccin-macchiato" lang="en">
			<body className="antialiased">
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
