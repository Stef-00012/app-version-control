import db, { schema } from "@/db/db";
import type { APIAuthPostBody } from "@/types/api";
import createToken from "@/util/createToken";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = (await req.json()) as APIAuthPostBody;

	if (!body || !body.username || !body.password)
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const username = body.username;
	const password = body.password;

	const existingUser = await db.query.users.findFirst({
		where: eq(schema.users.username, username),
	})

	if (existingUser) return NextResponse.json({ error: "Username already in use" }, { status: 403 });

	const newUser = await db
		.insert(schema.users)
		.values({
			username,
			password,
		})
		.returning({
			id: schema.users.id,
		});

	const userId = newUser[0].id;

	const token = createToken(userId);

	await db
		.update(schema.users)
		.set({
			tokens: [token],
		})
		.where(eq(schema.users.id, userId));

	const cookieStore = await cookies();

	cookieStore.set("token", token, {
		httpOnly: true,
	});

	return new NextResponse(null, { status: 204 });
}
