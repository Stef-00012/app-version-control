"use client";

import { AuthContext } from "@/contexts/AuthProvider";
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
					<a className="btn btn-ghost text-xl" href="/dashboard/settings">
						{user?.username}
					</a>
				</div>
			</div>
		</div>
	);
}
