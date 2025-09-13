import { themeKeys } from "@/constants/themes";
import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    _title: string;
    titleColor?: typeof themeKeys[0];
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
}

export default function Input({
    _title,
    titleColor,
    className = "rounded-lg! w-full",
    disabled = false,
    children: validator,
    ...props
}: Props) {
    return (
        <fieldset className="fieldset">
            <legend
                className={`fieldset-legend text-lg ${disabled ? "text-text/50" : ""} ${titleColor ? "px-1.5 py-0 rounded-lg mb-2 relative top-1.5" : ""}`}
                style={titleColor ? {
                    color: `var(--color-${titleColor})`, // text-{color}
                    backgroundColor: ["base-100", "base-200", "base-300"].includes(titleColor)
                        ? `color-mix(in oklab, var(--color-text) 50%, transparent)` // bg-text/50
                        : `var(--color-base-100)`, // bg-base-100
                } : undefined}
            >{_title}</legend>
            <input
                className={`input text-lg ${className} ${disabled ? "border-1 border-text/25!" : ""}`}
                disabled={disabled}
                {...props}
            />
            {validator}
        </fieldset>
    )
}