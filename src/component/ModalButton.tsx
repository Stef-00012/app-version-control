import type { ReactNode } from "react";

interface Props {
	modalId: string;
	closeButton?: boolean;
	closeOnClickOutside?: boolean;
	children: ReactNode;
	openButtonStyle?: string;
	openButtonContent?: ReactNode;
}

export default function ModalButton({
	modalId,
	closeButton = true,
	closeOnClickOutside = true,
	children,
	openButtonStyle = "btn btn-base-100 btn-base-200 p-2 m-3 rounded-md",
	openButtonContent = (
		<span className="material-symbols-rounded text-primary-content">add</span>
	),
}: Props) {
	return (
		<>
			<button
				type="button"
				className={openButtonStyle}
                //@ts-expect-error
				onClick={() => document.getElementById(modalId).showModal()}
			>
				{openButtonContent}
			</button>

			<dialog id={modalId} className="modal">
				<div className="modal-box">
					{closeButton && (
						<form method="dialog">
							<button
								type="submit"
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								<span className="material-symbols-rounded">close</span>
							</button>
						</form>
					)}

					{children}
				</div>

				{closeOnClickOutside && (
					<form method="dialog" className="modal-backdrop">
						<button type="submit" className="cursor-default">
							close
						</button>
					</form>
				)}
			</dialog>
		</>
	);
}
