"use client";

import { AuthContext } from "@/contexts/AuthProvider";
import Link from "next/link";
import { useContext } from "react";

export default function Navbar() {
	const { user } = useContext(AuthContext);

	return (
		<div className="navbar bg-base-300 shadow-lg">
			<div className="flex-1">
				<a className="btn btn-ghost bg-base-300 hover:bg-base-200 text-xl" href="/dashboard">
					Version Control
				</a>
			</div>

			<div className="flex gap-2">
				<div className="flex flex-row gap-2">
					{user.admin && (
						<Link className={`btn bg-base-100 hover:bg-base-200 text-xl text-blue ${user.id === -1 ? "pointer-events-none" : ""}`} href="/dashboard/admin/users">
							Manage Users
						</Link>
					)}

					<Link className={`btn bg-base-100 hover:bg-base-200 text-xl ${user.id === -1 ? "pointer-events-none" : ""}`} href="/dashboard/settings">
						{user?.username}
					</Link>
				</div>
			</div>
		</div>
	);
}
