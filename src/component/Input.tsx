import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    title: string;
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
}

export default function Input({
    title,
    className = "rounded-lg! w-full",
    disabled = false,
    children: validator,
    ...props
}: Props) {
    return (
        <fieldset className="fieldset">
            <legend className={`fieldset-legend text-lg ${disabled ? "text-gray-500" : ""}`}>{title}</legend>
            <input
                className={`input text-lg ${className} ${disabled ? "border-1 border-[#43475D]!" : ""}`}
                disabled={disabled}
                {...props}
            />
            {validator}
        </fieldset>
    )
}