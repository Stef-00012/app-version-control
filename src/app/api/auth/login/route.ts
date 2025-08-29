import db, { schema } from "@/db/db";
import type { APIAuthPostBody } from "@/types/api";
import checkAuth from "@/util/auth";
import createToken from "@/util/createToken";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const authUser = await checkAuth(req);
	const cookieStore = await cookies();

	if (authUser) {
		cookieStore.set("token", authUser.tokens[0], {
			httpOnly: true,
		});

		return new NextResponse(null, { status: 204 });
	}

	return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
	const body = (await req.json()) as APIAuthPostBody;

	if (!body || !body.username || !body.password)
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const user = await db.query.users.findFirst({
		where: and(
			eq(schema.users.username, body.username),
			eq(schema.users.password, body.password),
		),
	});

	if (!user)
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

	const token = createToken(user.id);

	const tokens = user.tokens ? [...user.tokens, token] : [token];

	await db
		.update(schema.users)
		.set({
			tokens,
		})
		.where(eq(schema.users.username, user.username));

	const cookieStore = await cookies();

	cookieStore.set("token", token, {
		httpOnly: true,
	});

	return new NextResponse(null, { status: 204 });
}
