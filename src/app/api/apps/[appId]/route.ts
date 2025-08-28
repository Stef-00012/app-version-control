import checkAuth from "@/util/auth";
import { type NextRequest, NextResponse } from "next/server";
import db, { schema } from "@/db/db";
import { and, eq } from "drizzle-orm";
import type { APIAppsPatchBody } from "@/types/api";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ appId: string }> },
) {
	const authUser = await checkAuth(req);

	if (!authUser) return new Response("Unauthorized", { status: 401 });

	const { appId } = await params;

	const appData = authUser.admin
		? await db.query.apps.findFirst({
				where: eq(schema.apps.appId, Number(appId)),
			})
		: await db.query.apps.findFirst({
				where: and(
					eq(schema.apps.appId, Number(appId)),
					eq(schema.apps.ownerId, authUser.id),
				),
			});

	if (!appData)
		return NextResponse.json({ error: "App not found" }, { status: 404 });

	return NextResponse.json(appData);
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ appId: string }> },
) {
	const authUser = await checkAuth(req);

	if (!authUser) return new Response("Unauthorized", { status: 401 });

	const { appId } = await params;

	const appData = authUser.admin
		? await db.query.apps.findFirst({
				where: eq(schema.apps.appId, Number(appId)),
			})
		: await db.query.apps.findFirst({
				where: and(
					eq(schema.apps.appId, Number(appId)),
					eq(schema.apps.ownerId, authUser.id),
				),
			});

	if (!appData)
		return NextResponse.json({ error: "App not found" }, { status: 404 });

	const body = (await req.json()) as APIAppsPatchBody;

	if (!body || !body.name)
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const newName = body.name;

	const newAppData = await db
		.update(schema.apps)
		.set({
			appName: newName,
		})
		.where(eq(schema.apps.appId, appData.appId))
		.returning();

	return NextResponse.json(newAppData[0]);
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ appId: string }> },
) {
	const authUser = await checkAuth(req);

	if (!authUser) return new Response("Unauthorized", { status: 401 });

	const { appId } = await params;

	const appData = authUser.admin
		? await db.query.apps.findFirst({
				where: eq(schema.apps.appId, Number(appId)),
			})
		: await db.query.apps.findFirst({
				where: and(
					eq(schema.apps.appId, Number(appId)),
					eq(schema.apps.ownerId, authUser.id),
				),
			});

	if (!appData)
		return NextResponse.json({ error: "App not found" }, { status: 404 });

	await db
		.delete(schema.apps)
        .where(eq(schema.apps.appId, appData.appId));

    await db
        .delete(schema.versions)
        .where(eq(schema.versions.appId, appData.appId));

	return new NextResponse(null, { status: 204 });
}
