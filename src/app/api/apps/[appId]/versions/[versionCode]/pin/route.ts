import db, { schema } from "@/db/db";
import type { APIVersionsPinPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { and, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ appId: string, versionCode: string }> }) {
    const authUser = await checkAuth(req);
    
    if (!authUser) return new Response("Unauthorized", { status: 401 });

    const { appId, versionCode } = await params;

    const versionData = await db.query.versions.findFirst({
        where: and(
            eq(schema.versions.versionCode, versionCode),
            eq(schema.versions.appId, Number(appId)),
            eq(schema.versions.ownerId, authUser.id)
        )
    })

    if (!versionData) return Response.json({ error: "Version not found" }, { status: 404 });

    return Response.json({ pinned: versionData.pinned || false })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ appId: string, versionCode: string }> }) {
    const authUser = await checkAuth(req);

    if (!authUser) return new Response("Unauthorized", { status: 401 });

    const { appId, versionCode } = await params;

    const versionData = await db.query.versions.findFirst({
        where: and(
            eq(schema.versions.versionCode, versionCode),
            eq(schema.versions.appId, Number(appId)),
            eq(schema.versions.ownerId, authUser.id)
        )
    })

    if (!versionData) return Response.json({ error: "Version not found" }, { status: 404 });

    const body = await req.json() as APIVersionsPinPatchBody;

    if (!body || typeof body.pinned !== "boolean") return Response.json({ error: "Invalid body" }, { status: 400 });

    const newAppData = await db
        .update(schema.versions)
        .set({
            pinned: body.pinned
        })
        .where(
            and(
                eq(schema.versions.versionCode, versionCode),
                eq(schema.versions.appId, Number(appId)),
                eq(schema.versions.ownerId, authUser.id)
            )
        )
        .returning();

    return Response.json(newAppData[0]);
}