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

export const apiAppsAppVersionsPostError404ModelRows: ModelTableProps["rows"] =
	[
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
];

export const apiAppsAppPinError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Application not found.",
	},
];

export const apiAppsAppPinPatchResponseModelRows: ModelTableProps["rows"] = [
	{
		name: "pinned",
		type: "boolean",
		description: "Whether the app is pinned or not.",
	},
];

export const apiAppsAppVersionsVersionGetError404ModelRows: ModelTableProps["rows"] =
	[
		{
			name: "error",
			type: "string",
			description: "Version not found.",
		},
	];

export const apiAppsAppVersionsVersionPatchBodyModelRows: ModelTableProps["rows"] =
	[
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
	];

export const apiAppsAppVersionsVersionPinError404ModelRows: ModelTableProps["rows"] =
	[
		{
			name: "error",
			type: "string",
			description: "Version not found.",
		},
	];

export const apiAppsAppVersionsVersionPinGetResponseModelRows: ModelTableProps["rows"] =
	[
		{
			name: "pinned",
			type: "boolean",
			description: "Whether the version is pinned or not.",
		},
	];

export const apiAppsAppVersionsVersionPinPatchResponseModelRows: ModelTableProps["rows"] =
	[
		{
			name: "pinned",
			type: "boolean",
			description: "Whether the version is pinned or not.",
		},
	];

export const apiAuthLoginPostBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "username",
		type: "string",
		description: "The user's username.",
	},
	{
		name: "password",
		type: "string",
		description: "The user's password.",
	},
];

export const apiAuthLoginError401ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Invalid credentials.",
	},
];

export const apiAuthRegisterPostBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "username",
		type: "string",
		description: "The user's username.",
	},
	{
		name: "password",
		type: "string",
		description: "The user's password.",
	},
];

export const apiAuthRegister403ErrorModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Username already in use.",
	},
];

export const apiPlatformsPostBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "name",
		type: "string",
		description: "Platform name.",
	},
	{
		name: "id",
		type: "string",
		description: "Platform unique ID.",
	},
];

export const apiAuthPlatforms403ErrorModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Platform ID already in use.",
	},
];

export const apiPlatformsPlatformGetError404ModelRows: ModelTableProps["rows"] =
	[
		{
			name: "error",
			type: "string",
			description: "Platform not found.",
		},
	];

export const apiAPlatformsPlatformPatchBodyModelRows: ModelTableProps["rows"] =
	[
		{
			name: "name",
			type: "string",
			description: "New application name.",
		},
	];

export const apiUsersPostBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "username",
		type: "string",
		description: "The user's username.",
	},
	{
		name: "password",
		type: "string",
		description: "The user's password.",
	},
	{
		name: "admin",
		type: "boolean?",
		description:
			"Whether the user should have admin privileges. Defaults to false.",
	},
];

export const apiUsersPostResponseModelRows: ModelTableProps["rows"] = [
	{
		name: "success",
		type: "boolean",
		description: "Whether the user was created successfully.",
	},
	{
		name: "token",
		type: "string",
		description: "Authentication token for the newly created user.",
	},
];

export const apiUsersPostError403ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "User already exists or invalid body.",
	},
];

export const apiUsersUserGetError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "User not found.",
	},
];

export const apiUsersUserPatchBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "username",
		type: "string?",
		description: "The user's new username.",
	},
	{
		name: "password",
		type: "string?",
		description: "The user's new password.",
	},
	{
		name: "admin",
		type: "boolean?",
		description: "Whether the user should have admin privileges.",
	},
];

export const apiUsersMePatchBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "username",
		type: "string?",
		description: "The user's new username.",
	},
	{
		name: "password",
		type: "string?",
		description: "The user's new password.",
	},
];

export const apiUsersMe403ErrorModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Password too weak.",
	},
];

export const apiUsersMeSessionTokenGetResponseModelRows: ModelTableProps["rows"] =
	[
		{
			name: "token",
			type: "string",
			description: "The user's session token.",
		},
	];

export const apiUsersMeTokensGetResponseModelRows: ModelTableProps["rows"] = [
	{
		name: "tokens",
		type: "string[",
		description: "The user's tokens.",
	},
];

export const apiUsersMeTokensPatchBodyModelRows: ModelTableProps["rows"] = [
	{
		name: "token",
		type: "string",
		description: "The token to delete.",
	},
];

export const apiUsersMeTokensPatchError404ModelRows: ModelTableProps["rows"] = [
	{
		name: "error",
		type: "string",
		description: "Token not found.",
	},
];

export const apiUsersUserMeTokensPostResponseModelRows: ModelTableProps["rows"] =
	[
		{
			name: "token",
			type: "string",
			description: "The new token.",
		},
	];

export const appModelRows: ModelTableProps["rows"] = [
	{
		name: "appId",
		type: "number",
		description: "Unique ID of the app.",
	},
	{
		name: "ownerId",
		type: "number",
		description: "ID of the user that owns the app.",
	},
	{
		name: "name",
		type: "string",
		description: "Name of the app.",
	},
	{
		name: "pinned",
		type: "boolean | null",
		description: "Whether the app is pinned or not.",
	},
];

export const versionModelRows: ModelTableProps["rows"] = [
	{
		name: "appId",
		type: "number",
		description: "Unique ID of the app.",
	},
	{
		name: "ownerId",
		type: "number",
		description: "ID of the user that owns the app.",
	},
	{
		name: "pinned",
		type: "boolean | null",
		description: "Whether the version is pinned or not.",
	},
	{
		name: "platforms",
		type: "VersionPlatforms",
		description: "Platforms the version is available on.",
		url: "/docs/models/versions#VersionPlatforms",
	},
	{
		name: "versionName",
		type: "string",
		description: "Version name.",
	},
	{
		name: "versionCode",
		type: "string",
		description: "Unique version code.",
	},
];

export const versionPlatformsModelRows: ModelTableProps["rows"] = [
	{
		name: "[platformId: string]",
		type: "boolean",
		description:
			"Whether the version is available on the platform with the given ID.",
	},
];

export const platformModelRows: ModelTableProps["rows"] = [
	{
		name: "name",
		type: "string",
		description: "Name of the platform.",
	},
	{
		name: "id",
		type: "string",
		description: "Unique ID of the platform.",
	},
];

export const userModelRows: ModelTableProps["rows"] = [
	{
		name: "id",
		type: "number",
		description: "Unique ID of the user.",
	},
	{
		name: "username",
		type: "string",
		description: "The user's username.",
	},
	{
		name: "admin",
		type: "boolean",
		description: "Whether the user has admin privileges.",
	},
];

export const selfUserModelRows: ModelTableProps["rows"] = [
	{
		name: "id",
		type: "number",
		description: "Unique ID of the user.",
	},
	{
		name: "username",
		type: "string",
		description: "The user's username.",
	},
	{
		name: "admin",
		type: "boolean",
		description: "Whether the user has admin privileges.",
	},
	{
		name: "tokens",
		type: "string[]",
		description: "The user's tokens.",
	},
];
