import { useState } from "react";

interface Props {
    label: string;
    name: string;
	toggled?: boolean;
	onToggle?: (toggled: boolean) => void;
}

export default function Toggle({ label, name, toggled, onToggle }: Props) {
    const [isToggled, setIsToggled] = useState(toggled ?? false);

	return (
        <label className="label">
            <input
                type="checkbox"
                name={name}
                checked={isToggled}
                onChange={() => {
                    onToggle?.(!isToggled);
                    setIsToggled(!isToggled);
                }}
                className="toggle text-base-content"
            />
            {label}
        </label>
	);
}
