const colors = {
	200: "bg-green-400 text-black",
	201: "bg-green-400 text-black",
	204: "bg-green-400 text-black",
	400: "bg-red-400 text-black",
	401: "bg-red-400 text-black",
	404: "bg-red-400 text-black",
	429: "bg-red-400 text-black",
};

interface ApiBadgeProps {
	type: 200 | 201 | 204 | 400 | 401 | 404 | 429;
	contentType: "application/json" | "No Content";
}

export default function ResponsesBadge({ type, contentType }: ApiBadgeProps) {
	const color = colors[type];

	return (
		<div className="p-4 bg-base-200 rounded-xl inline-block">
			<div className="flex">
				<div className="inline-block font-bold text-center rounded-md mr-4 self-center">
					<span className={`bg-gray-200 rounded-md p-1.5 ${color}`}>
						{type}
					</span>
				</div>
				<p className="bg-base-300 p-1 rounded-md font-mono text-xl">{contentType}</p>
			</div>
		</div>
	);
}
