import db from "@/db/db";
import schema from "@/db/schema";
import type { APIVersionsPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { and, eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ versionCode: string }> }) {
    const authUser = await checkAuth(req);
    
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as APIVersionsPatchBody;

    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const { versionCode } = await params;

    const versionData = authUser.admin
        ? await db.query.versions.findFirst({
            where: eq(schema.versions.versionCode, versionCode),
        })
        : await db.query.versions.findFirst({
            where: and(
                eq(schema.versions.versionCode, versionCode),
                eq(schema.versions.owner, authUser.username),
            )
        });

    if (!versionData)
        return NextResponse.json({ error: "Version not found" }, { status: 404 });

    await db.update(schema.versions).set({
        platforms: body.platforms ?? versionData.platforms,
        versionName: body.versionName ?? versionData.versionName,
    }).where(eq(schema.versions.versionCode, versionCode));

	return new NextResponse(null, { status: 204 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ versionCode: string }> }) {
	const authUser = await checkAuth(req);
    
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { versionCode } = await params;

    const versionData = authUser.admin
        ? await db.query.versions.findFirst({
            where: eq(schema.versions.versionCode, versionCode),
        })
        : await db.query.versions.findFirst({
            where: and(
                eq(schema.versions.versionCode, versionCode),
                eq(schema.versions.owner, authUser.username),
            )
        });

    if (!versionData)
        return NextResponse.json({ error: "Version not found" }, { status: 404 });

    await db.delete(schema.versions).where(eq(schema.versions.versionCode, versionCode));

	return new NextResponse(null, { status: 204 });
}