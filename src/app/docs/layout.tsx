import { Sidebar } from "@/components/docs/Sidebar";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
    title: "App Version Control Documentation",
    description:
        "Documentation for the App Version Control API.",
    openGraph: {
        title: "App Version Control Documentation",
        description:
            "Documentation for the App Version Control API.",
        type: "website",
    },
};

export default function SidebarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen bg-background">
			<Sidebar>
				<div className="flex-1 p-6 mt-8 lg:mt-0">{children}</div>
			</Sidebar>
		</div>
	);
}
