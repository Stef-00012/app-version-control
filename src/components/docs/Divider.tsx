interface Props {
	large?: boolean;
}

export default function Divider({ large }: Props) {
	return (
		<div className={`w-full border-base-200 ${large ? "border-y-5" : "border-y-2"} rounded-full my-5`} />
	);
}
