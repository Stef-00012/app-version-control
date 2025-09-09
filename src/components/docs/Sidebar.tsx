"use client";

import { sidebarItems } from "@/constants/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

export interface SidebarItem {
	title: string;
	href?: string;
	icon?: string;
	children?: SidebarItem[];
}

interface SidebarItemProps {
	item: SidebarItem;
	level?: number;
}

function SidebarItem({ item, level = 0 }: SidebarItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const hasChildren = item.children && item.children.length > 0;

	const handleToggle = () => {
		if (hasChildren) {
			const newIsOpen = !isOpen;

			setIsOpen(newIsOpen);
		}

		if (item.href) router.push(item.href);
	};

	return (
		<div>
			<button
				type="button"
				onClick={handleToggle}
				className={`flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-base-100 border-2 border-transparent hover:border-[#43475D] font-medium text-base-content cursor-pointer`}
				style={{
					marginLeft: `${level * 12}px`,
					width: level > 1 ? `calc(100% - ${level * 12}px)` : "100%",
				}}
			>
				{item.icon && level === 0 && (
					<span className="material-symbols-outlined text-text mr-3">
						{item.icon}
					</span>
				)}

				{level > 0 && item.icon && item.icon !== "" && (
					<span className="material-symbols-outlined text-sm mr-2 opacity-60">
						{item.icon}
					</span>
				)}

				<span className="flex-1 text-left text-lg">{item.title}</span>

				{hasChildren && (
					<span
						className={`material-symbols-outlined text-text transition-transform ${isOpen ? "rotate-90" : ""}`}
					>
						chevron_right
					</span>
				)}
			</button>

			{hasChildren && isOpen && (
				<div className="mt-1 space-y-1">
					{item.children?.map((child, index) => (
						<SidebarItem
							// biome-ignore lint/suspicious/noArrayIndexKey: index the only unique key
							key={index}
							item={child}
							level={level + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export function Sidebar({ children }: { children: ReactNode }) {
	const drawerId = "docs-sidebar";

	return (
		<div className="drawer lg:drawer-open">
			<input id={drawerId} type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<label
					htmlFor={drawerId}
					className="btn btn-circle drawer-button lg:hidden absolute top-4 left-4"
				>
					<span className="material-symbols-outlined">menu</span>
				</label>

				<div className="lg:ml-80">
					{children}
				</div>
			</div>

			<div className="drawer-side">
				<label
					htmlFor={drawerId}
					aria-label="close sidebar"
					className="drawer-overlay"
				/>
				<ul
					className="
						menu bg-base-200 text-base-content min-h-full w-80 p-4
						lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:z-40
						lg:border-r lg:border-base-300
						lg:overflow-y-auto
					"
				>
					{/* Header */}
					<div className="border-b border-base-300">
						<div className="flex justify-between">
							<Link href="/docs" className="font-bold text-2xl text-base-content">
								App Version Control
							</Link>

							<label
								htmlFor={drawerId}
								className="btn btn-circle bg-base-300 drawer-button lg:hidden"
							>
								<span className="material-symbols-outlined text-red">close</span>
							</label>
						</div>
					</div>

					{/* Search */}
					<div className="bg-base-200 rounded-lg shadow-lg p-3">
						<div className="relative">
							<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text/40 text-lg z-2">
								search
							</span>

							<input
								type="text"
								placeholder="Search docs..."
								className="input input-bordered w-full pl-10 text-sm bg-base-100"
							/>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 p-4 overflow-y-auto">
						<div className="space-y-2">
							{sidebarItems.map((item, index) => (
								<SidebarItem
									// biome-ignore lint/suspicious/noArrayIndexKey: index the only unique key
									key={index}
									item={item}
								/>
							))}
						</div>
					</nav>
				</ul>
			</div>
		</div>
	);
}