export interface Theme {
    label: string;
    id: string;
    colors: {
        error: `#${string}`;
        accent: `#${string}`;
        primary: `#${string}`;
        info: `#${string}`;
        text: `#${string}`;
        "base-content": `#${string}`;
        "primary-content": `#${string}`;
        "base-100": `#${string}`;
        "base-200": `#${string}`;
        "base-300": `#${string}`;
    }
}