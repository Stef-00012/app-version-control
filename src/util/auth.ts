import db from "@/db/db";
import schema from "@/db/schema";
import { sql } from "drizzle-orm";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export default function checkAuth(
	req?: NextRequest,
	admin?: boolean,
	returnToken?: false,
): Promise<null | Omit<typeof schema.users.$inferSelect, "password">>;

export default function checkAuth(
	req: NextRequest | undefined,
	admin: boolean | undefined,
	returnToken: true,
): Promise<null | {
	user: Omit<typeof schema.users.$inferSelect, "password">;
	token: string;
}>;

export default async function checkAuth(
	req?: NextRequest,
	admin?: boolean,
	returnToken?: boolean,
): Promise<
	| null
	| Omit<typeof schema.users.$inferSelect, "password">
	| { user: Omit<typeof schema.users.$inferSelect, "password">; token: string }
> {
	const cookieStore = await cookies();

	const tokenCookie = cookieStore.get("token");

	const auth = req?.headers.get("Authorization") || tokenCookie?.value;

	if (!auth) return null;

	const res = await db
		.select({
			admin: schema.users.admin,
			id: schema.users.id,
			username: schema.users.username,
			tokens: schema.users.tokens,
		})
		.from(schema.users)
		.where(
			sql`JSON_TYPE(${schema.users.tokens}) = 'array' AND EXISTS (
            SELECT 1 FROM JSON_EACH(${schema.users.tokens}) WHERE value = ${auth}
            )`,
		)
		.limit(1);

	const user = res[0];

	if (!user) return null;
	if (admin && !user.admin) return null;

	if (returnToken)
		return {
			user: user,
			token: auth,
		};

	return user;
}
