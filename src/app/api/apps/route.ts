import db, { schema } from "@/db/db";
import type { APIAppsPostBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const authUser = await checkAuth(req);

	if (!authUser) return new Response("Unauthorized", { status: 401 });

	const appsData = authUser.admin
		? await db.query.apps.findMany({})
		: await db.query.apps.findMany({
				where: eq(schema.apps.ownerId, authUser.id),
			});

	return NextResponse.json(appsData);
}

export async function POST(req: NextRequest) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = (await req.json()) as APIAppsPostBody;

	if (!body || !body.name)
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const newApp = await db
		.insert(schema.apps)
		.values({
			appName: body.name,
			ownerId: authUser.id,
		})
		.returning();

	return NextResponse.json(newApp[0], { status: 201 });
}
