import db, { schema } from "@/db/db";
import type { APIVersionsPostBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export default async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ appId: string }> },
) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

	const versions = await db.query.versions.findMany({
		where: eq(schema.versions.appId, Number(appId)),
	});

	return NextResponse.json(versions);
}

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ appId: string }> },
) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

	const body = (await req.json()) as APIVersionsPostBody;

	if (!body || !body.versionCode)
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const existingVersion = await db.query.versions.findFirst({
		where: and(
			eq(schema.versions.versionCode, body.versionCode),
			eq(schema.versions.appId, appData.appId),
		),
	});

	if (existingVersion)
		return NextResponse.json(
			{ error: "Version code already exists" },
			{ status: 400 },
		);

	const platforms = body.platforms ?? {};
	const validPlatformsRes = await db.query.platforms.findMany();
	const validPlatforms = validPlatformsRes.map((platform) => platform.id);

	for (const platform of Object.keys(platforms)) {
		if (!validPlatforms.includes(platform)) {
			return NextResponse.json(
				{ error: `Invalid platform: ${platform}` },
				{ status: 400 },
			);
		}
	}

	const inserted = await db
		.insert(schema.versions)
		.values({
			ownerId: appData.ownerId,
			appId: appData.appId,
			versionCode: body.versionCode,
			versionName: body.versionName ?? body.versionCode,
			platforms: body.platforms ?? {},
		})
		.returning();

	const newVersion = inserted[0];

	return NextResponse.json(newVersion, { status: 201 });
}
