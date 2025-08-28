import db, { schema } from "@/db/db";
import type { APIVersionsPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ appId: string; versionCode: string }> },
) {
	const { appId, versionCode } = await params;

	const versionData = await db.query.versions.findFirst({
		where: and(
			eq(schema.versions.appId, Number(appId)),
			eq(schema.versions.versionCode, versionCode),
		),
	});

	if (!versionData)
		return NextResponse.json({ error: "Version not found" }, { status: 404 });

	return NextResponse.json(versionData);
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ appId: string; versionCode: string }> },
) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = (await req.json()) as APIVersionsPatchBody;

	if (!body || (!body.platforms && !body.versionName))
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const { appId, versionCode } = await params;

	const versionData = authUser.admin
		? await db.query.versions.findFirst({
				where: and(
					eq(schema.versions.appId, Number(appId)),
					eq(schema.versions.versionCode, versionCode),
				),
			})
		: await db.query.versions.findFirst({
				where: and(
					eq(schema.versions.appId, Number(appId)),
					eq(schema.versions.versionCode, versionCode),
					eq(schema.versions.ownerId, authUser.id),
				),
			});

	if (!versionData)
		return NextResponse.json({ error: "Version not found" }, { status: 404 });

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

	const newVersion = await db
		.update(schema.versions)
		.set({
			platforms: body.platforms ?? versionData.platforms,
			versionName: body.versionName ?? versionData.versionName,
		})
		.where(
			and(
				eq(schema.versions.appId, Number(appId)),
				eq(schema.versions.versionCode, versionCode),
			),
		)
		.returning();

	return NextResponse.json(newVersion[0], { status: 200 });
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ appId: string; versionCode: string }> },
) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { appId, versionCode } = await params;

	const versionData = authUser.admin
		? await db.query.versions.findFirst({
				where: and(
					eq(schema.versions.appId, Number(appId)),
					eq(schema.versions.versionCode, versionCode),
				),
			})
		: await db.query.versions.findFirst({
				where: and(
					eq(schema.versions.appId, Number(appId)),
					eq(schema.versions.versionCode, versionCode),
					eq(schema.versions.ownerId, authUser.id),
				),
			});

	if (!versionData)
		return NextResponse.json({ error: "Version not found" }, { status: 404 });

	await db
		.delete(schema.versions)
		.where(
			and(
				eq(schema.versions.appId, versionData.appId),
				eq(schema.versions.versionCode, versionCode),
			),
		);

	return new NextResponse(null, { status: 204 });
}
