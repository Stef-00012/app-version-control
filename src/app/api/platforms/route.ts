import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { eq } from "drizzle-orm";
import schema from "@/db/schema";
import type { APIPlatformsPostBody } from "@/types/api";
import checkAuth from "@/util/auth";

export const dynamic = "force-dynamic";

export async function GET() {
	const platforms = await db.query.platforms.findMany();

	return NextResponse.json(platforms);
}

export async function POST(req: NextRequest) {
	const authUser = await checkAuth(req, true);

    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as APIPlatformsPostBody;

    if (!body || !body.name || !body.id) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const platformName = body.name;
    const platformId = body.id;

    const platformData = await db.query.platforms.findFirst({
        where: eq(schema.platforms.name, platformName),
    });

    if (platformData) return NextResponse.json({ error: "Platform already exists" }, { status: 403 });

    const platform = await db.insert(schema.platforms).values({
        name: platformName,
        id: platformId,
    }).returning()

    return NextResponse.json(platform[0], { status: 201 });
}
