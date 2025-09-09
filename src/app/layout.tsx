import type { Metadata, Viewport } from "next";
import AuthProvider from "@/contexts/AuthProvider";
import { ToastContainer } from "react-toastify";

import "./globals.css";

export const metadata: Metadata = {
    title: "App Version Control",
    description:
        "A version control API to know if there an available update in anyof your apps and if so, prompt the user to update.",
    openGraph: {
        title: "App Version Control",
        description:
            "A version control API to know if there an available update in anyof your apps and if so, prompt the user to update.",
        type: "website",
    },
};

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
				<AuthProvider>
					{children}
					<ToastContainer theme="dark" closeOnClick />
				</AuthProvider>
			</body>
		</html>
	);
}
