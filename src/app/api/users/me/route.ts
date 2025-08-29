import db from "@/db/db";
import schema from "@/db/schema";
import type { APISelfUserPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.debug("GET /api/users/me - start");
	const authUser = await checkAuth(req);
	console.debug("GET /api/users/me - authUser");

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	return NextResponse.json(authUser);
}

export async function PATCH(req: NextRequest) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = (await req.json()) as APISelfUserPatchBody;

	if (!body || (!body.username && !body.password))
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	await db
		.update(schema.users)
		.set({
			username: body.username,
			password: body.password,
		})
		.where(eq(schema.users.id, authUser.id));

	return new NextResponse(null, { status: 204 });
}

export async function DELETE(req: NextRequest) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	await db.delete(schema.users).where(eq(schema.users.id, authUser.id));

	await db
		.delete(schema.versions)
		.where(eq(schema.versions.ownerId, authUser.id));

	await db.delete(schema.apps).where(eq(schema.apps.ownerId, authUser.id));

	return new NextResponse(null, { status: 204 });
}
