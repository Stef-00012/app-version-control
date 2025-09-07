import type schema from "@/db/schema";

export interface APIResponses {
	"GET /apps": (typeof schema.apps.$inferSelect)[];
	"POST /apps": typeof schema.apps.$inferSelect;

	"GET /apps/:id": typeof schema.apps.$inferSelect;
	"PATCH /apps/:id": typeof schema.apps.$inferSelect;
	"DELETE /apps/:id": null;

	"GET /apps/:id/pin": { pinned: boolean };
	"PATCH /apps/:id/pin": typeof schema.apps.$inferSelect;

	"GET /apps/:id/versions": (typeof schema.versions.$inferSelect)[];
	"POST /apps/:id/versions": typeof schema.versions.$inferSelect;

	"GET /apps/:id/versions/:versionCode": typeof schema.versions.$inferSelect;
	"PATCH /apps/:id/versions/:versionCode": typeof schema.versions.$inferSelect;
	"DELETE /apps/:id/versions/:versionCode": null;

	"GET /apps/:id/versions/:versionCode/pin": { pinned: boolean };
	"PATCH /apps/:id/versions/:versionCode/pin": typeof schema.versions.$inferSelect;

	"GET /auth/login": null;
	"POST /auth/login": null;

	"POST /auth/register": null;

	"GET /platforms": (typeof schema.platforms.$inferSelect)[];
	"POST /platforms": typeof schema.platforms.$inferSelect;

	"GET /platforms/:id": typeof schema.platforms.$inferSelect;
	"PATCH /platforms/:id": typeof schema.platforms.$inferSelect;
	"DELETE /platforms/:id": null;

	"GET /users": (typeof schema.users.$inferSelect)[];
	"POST /users": {
		success: boolean;
		token: string;
	};

	"GET /users/:id": Omit<typeof schema.users.$inferSelect, "password">;
	"PATCH /users/:id": null;
	"DELETE /users/:id": null;

	"GET /users/me": Omit<typeof schema.users.$inferSelect, "password">;
	"PATCH /users/me": null;
	"DELETE /users/me": null;

	"GET /users/me/sessionToken": {
		user: Omit<typeof schema.users.$inferSelect, "password">;
		token: string;
	};

	"GET /users/me/tokens": string[];
	"PATCH /users/me/tokens": null;
	"POST /users/me/tokens": { token: string };
}
