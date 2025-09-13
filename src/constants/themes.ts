import type { Theme } from "@/types/theme";

export const themeKeys: (keyof Theme["colors"])[] = [
    "error",
    "accent",
    "primary",
    "info",
    "text",
    "base-content",
    "primary-content",
    "base-100",
    "base-200",
    "base-300",
];

export const themes: Theme[] = [
    {
        label: "Catpuccin Macchiato",
        id: "catpuccin-macchiato",
        colors: {
            error: "#ed8796", // red
            accent: "#c6a0f6", // mauvre
            primary: "#c6a0f6", // mauvre
            info: "#8aadf4", // blue
            text: "#cad3f5", // text
            "base-content": "#cad3f5", // text
            "primary-content": "#cad3f5", // text
            "base-100": "#24273a", // base
            "base-200": "#1e2030", // mantle
            "base-300": "#181926", // crust
        }
    },
    {
        label: "Catpuccin Latte",
        id: "catpuccin-latte",
        colors: {
            error: "#d20f39", // red
            accent: "#8839ef", // mauvre
            primary: "#8839ef", // mauvre
            info: "#1e66f5", // blue
            text: "#4c4f69", // text
            "base-content": "#4c4f69", // text
            "primary-content": "#4c4f69", // text
            "base-100": "#eff1f5", // base
            "base-200": "#e6e9ef", // mantle
            "base-300": "#dce0e8", // crust
        }
    },
    {
        label: "Catpuccin Frappé",
        id: "catpuccin-frappé",
        colors: {
            error: "#e78284", // red
            accent: "#ca9ee6", // mauvre
            primary: "#ca9ee6", // mauvre
            info: "#8caaee", // blue
            text: "#c6d0f5", // text
            "base-content": "#c6d0f5", // text
            "primary-content": "#c6d0f5", // text
            "base-100": "#303446", // base
            "base-200": "#292c3c", // mantle
            "base-300": "#232634", // crust
        }
    },
    {
        label: "Catpuccin Mocha",
        id: "catpuccin-mocha",
        colors: {
            error: "#f38ba8", // red
            accent: "#cba6f7", // mauvre
            primary: "#cba6f7", // mauvre
            info: "#89b4fa", // blue
            text: "#cdd6f4", // text
            "base-content": "#cdd6f4", // text
            "primary-content": "#cdd6f4", // text
            "base-100": "#1e1e2e", // base
            "base-200": "#181825", // mantle
            "base-300": "#11111b", // crust
        }
    },
    {
        label: "Rosé Pine",
        id: "rose-pine",
        colors: {
            error: "#eb6f92", // love
            accent: "#c4a7e7", // iris
            primary: "#c4a7e7", // iris
            info: "#9ccfd8", // foam
            text: "#e0def4", // text
            "base-content": "#e0def4", // text
            "primary-content": "#e0def4", // text
            "base-100": "#26233a", // overlay
            "base-200": "#1f1d2e", // surface
            "base-300": "#191724", // base
        }
    },
    {
        label: "Rosé Pine Moon",
        id: "rose-pine-moon",
        colors: {
            error: "#eb6f92", // love
            accent: "#c4a7e7", // iris
            primary: "#c4a7e7", // iris
            info: "#9ccfd8", // foam
            text: "#e0def4", // text
            "base-content": "#e0def4", // text
            "primary-content": "#e0def4", // text
            "base-100": "#393552", // overlay
            "base-200": "#2a273f", // surface
            "base-300": "#232136", // base
        }
    },
    {
        label: "Rosé Pine Dawn",
        id: "rose-pine-dawn",
        colors: {
            error: "#b4637a", // love
            accent: "#907aa9", // iris
            primary: "#907aa9", // iris
            info: "#56949f", // foam
            text: "#575279", // text
            "base-content": "#575279", // text
            "primary-content": "#575279", // text
            "base-100": "#f2e9e1", // overlay
            "base-200": "#fffaf3", // surface
            "base-300": "#faf4ed", // base
        }
    },
    {
        label: "Custom",
        id: "custom",
        colors: {
            error: "#ffffff",
            accent: "#ffffff",
            primary: "#ffffff",
            info: "#ffffff",
            text: "#ffffff",
            "base-content": "#ffffff",
            "primary-content": "#ffffff",
            "base-100": "#ffffff",
            "base-200": "#ffffff",
            "base-300": "#ffffff",
        }
    }
];
