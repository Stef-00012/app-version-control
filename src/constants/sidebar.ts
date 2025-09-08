import type { SidebarItem } from "@/components/docs/Sidebar";

export const sidebarItems: SidebarItem[] = [
	{
        title: "API",
        icon: "developer_guide",
        children: [
            {
                title: "/apps",
                children: [
                    {
                        title: "Methods",
                        href: "/docs/api/apps"
                    },
                    {
                        title: "/:appId",
                        children: [
                            {
                                title: "Model",
                                href: "/docs/models/app"
                            },
                            {
                                title: "Methods",
                                href: "/docs/api/apps/:appId"
                            },
                            {
                                title: "/pin",
                                href: "/docs/api/apps/:appId/pin"
                            },
                            {
                                title: "/versions",
                                children: [
                                    {
                                        title: "Methods",
                                        href: "/docs/api/apps/:appId/versions"
                                    },
                                    {
                                        title: "/:versionCode",
                                        children: [
                                            {
                                                title: "Model",
                                                href: "/docs/models/version"
                                            },
                                            {
                                                title: "Methods",
                                                href: "/docs/api/apps/:appId/versions/:versionCode"
                                            },
                                            {
                                                title: "/pin",
                                                href: "/docs/api/apps/:appId/versions/:versionCode/pin"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: "/auth",
                children: [
                    {
                        title: "/login",
                        href: "/docs/api/auth/login"
                    },
                    {
                        title: "/register",
                        href: "/docs/api/auth/register"
                    }
                ]
            },
            {
                title: "/platforms",
                children: [
                    {
                        title: "Methods",
                        href: "/docs/api/platforms"
                    },
                    {
                        title: "/:platformId",
                        children: [
                            {
                                title: "Model",
                                href: "/docs/models/platform"
                            },
                            {
                                title: "Methods",
                                href: "/docs/api/platforms/:platformId"
                            }
                        ]
                    }
                ]
            },
            {
                title: "/users",
                children: [
                    {
                        title: "Methods",
                        href: "/docs/api/users"
                    },
                    {
                        title: "/:userId",
                        children: [
                            {
                                title: "Model",
                                href: "/docs/models/user"
                            },
                            {
                                title: "Methods",
                                href: "/docs/api/users/:userId"
                            }
                        ]
                    },
                    {
                        title: "/me",
                        children: [
                            {
                                title: "Model",
                                href: "/docs/models/selfUser"
                            },
                            {
                                title: "Methods",
                                href: "/docs/api/users/me"
                            },
                            {
                                title: "/tokens",
                                href: "/docs/api/users/me/tokens"
                            },
                            {
                                title: "/sessionToken",
                                href: "/docs/api/users/me/sessionToken"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "Models",
        icon: "data_object",
        children: [
            {
                title: "App",
                href: "/docs/models/app"
            },
            {
                title: "Version",
                href: "/docs/models/version"
            },
            {
                title: "Platform",
                href: "/docs/models/platform"
            },
            {
                title: "User",
                href: "/docs/models/user"
            },
            {
                title: "SelfUser",
                href: "/docs/models/selfUser"
            }
        ]
    }
];