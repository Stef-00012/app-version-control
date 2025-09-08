import type { ModelTableProps } from "@/components/docs/ModelTable";

export const tableHeader = ["Name", "Type", "Description"];

export const apiError400ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Invalid body.",
	},
];

export const apiError401ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Unauthorized.",
	},
];

export const apiAppsPostBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "name",
		type: "string",
		description: "Application name.",
	},
];

export const apiAppsAppGetError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Application not found.",
	},
];

export const apiAppsAppPatchBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "name",
		type: "string",
		description: "New application name.",
	},
];

export const apiAppsAppPatchError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Application not found.",
	},
];

export const apiAppsAppDeleteError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Application not found.",
	},
];

export const apiAppsAppVersionsGetError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Version not found.",
	},
];

export const apiAppsAppVersionsGPostBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "platforms",
		type: "Platforms?",
		description: "Platforms the versions is available on.",
		url: "/docs/models/versions#Platforms",
	},
	{
		name: "versionName",
		type: "string?",
		description: "Version name.",
	},
	{
		name: "versionCode",
		type: "string?",
		description: "Unique version code.",
	},
];

export const apiAppsAppVersionsPostError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Version not found.",
	},
];

export const apiAppsAppPinGetResponseModelRows: ModelTableProps["rows"] = [
	{
		name: "pinned",
		type: "boolean",
		description: "Whether the app is pinned or not.",
	},
]

export const apiAppsAppPinError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Application not found.",
	},
]

export const apiAppsAppPinPatchResponseModelRows: ModelTableProps["rows"] = [
	{
		name: "pinned",
		type: "boolean",
		description: "Whether the app is pinned or not.",
	},
]