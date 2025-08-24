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