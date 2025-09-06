import type { VersionPlatforms } from "./db";

export interface APIPlatformsPostBody {
	name?: string;
	id?: string;
	icon?: string;
}

export interface APIPlatformsPatchBody {
	name?: string;
	icon?: string;
}

export interface APIUsersPostBody {
	username?: string;
	password?: string;
	admin?: boolean;
}

export interface APIUsersPatchBody {
	username?: string;
	password?: string;
	admin?: boolean;
}

export interface APISelfUserPatchBody {
	username?: string;
	password?: string;
}

export interface APIVersionsPostBody {
	platforms?: VersionPlatforms;
	versionName?: string;
	versionCode?: string;
}

export interface APIVersionsPatchBody {
	platforms?: VersionPlatforms;
	versionName?: string;
}

export interface APIAuthPostBody {
	username?: string;
	password?: string;
}

export interface APIAppsPostBody {
	name?: string;
}

export interface APIAppsPatchBody {
	name?: string;
}

export interface APIAppsPinPatchBody {
	pinned?: boolean;
}

export interface APIVersionsPinPatchBody {
	pinned?: boolean;
}
