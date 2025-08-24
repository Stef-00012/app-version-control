import db, { schema } from "@/db/db";
import type { APIVersionsPostBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const searchParams = req.nextUrl.searchParams;

	const getAll = searchParams.get("all");

	const versions =
		authUser.admin && getAll === "true"
			? await db.query.versions.findMany({})
			: await db.query.versions.findMany({
					where: eq(schema.versions.owner, authUser.username),
				});

	return NextResponse.json(versions);
}

export async function POST(req: NextRequest) {
	const authUser = await checkAuth(req);

	if (!authUser)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = (await req.json()) as APIVersionsPostBody;

	if (!body || !body.versionName || !body.versionCode)
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });

	const versionCode = body.versionCode;
	const versionName = body.versionName;
	const platforms = body.platforms ?? {};

	const versionData = await db.query.versions.findFirst({
		where: and(
			eq(schema.versions.owner, authUser.username),
			eq(schema.versions.versionCode, versionCode),
		),
	});

	if (versionData)
		return NextResponse.json(
			{ error: "Version already exists" },
			{ status: 400 },
		);

	await db.insert(schema.versions).values({
		owner: authUser.username,
		versionCode,
		versionName,
		platforms,
	});

	return new NextResponse(null, { status: 204 });
}
