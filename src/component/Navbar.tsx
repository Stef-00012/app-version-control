"use client";

import { AuthContext } from "@/contexts/AuthProvider";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
	const { user } = useContext(AuthContext);

	return (
		<div className="navbar bg-base-300 shadow-lg">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl" href="/dashboard">
					Version Control
				</a>
			</div>
			<div className="flex gap-2">
				<div className="flex-1">
					<Link className={`btn btn-ghost text-xl ${user.id === -1 ? "pointer-events-none" : ""}`} href="/dashboard/settings">
						{user?.username}
					</Link>
				</div>
			</div>
		</div>
	);
}
