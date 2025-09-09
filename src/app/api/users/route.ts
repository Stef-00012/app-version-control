import { type NextRequest, NextResponse } from "next/server";
import db, { schema } from "@/db/db";
import { eq } from "drizzle-orm";
import type { APIUsersPostBody } from "@/types/api";
import checkAuth from "@/util/auth";
import createToken from "@/util/createToken";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	const authUser = await checkAuth(req, true);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const users = await db.query.users.findMany({
		columns: {
			password: false,
			tokens: false,
		},
	});

	return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
	const authUser = await checkAuth(req, true);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = (await req.json()) as APIUsersPostBody;

	if (!body || !body.username || !body.password)
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const userName = body.username;
	const userPassword = body.password;

	const userData = await db.query.users.findFirst({
		where: eq(schema.users.username, userName),
	});

	if (userData)
		return NextResponse.json({ error: "User already exists" }, { status: 403 });

	const newUser = await db.insert(schema.users).values({
		username: userName,
		password: userPassword,
		admin: body.admin ?? false,
	}).returning({
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

	return NextResponse.json({
		success: true,
		token: token,
	}, { status: 201 });
}
