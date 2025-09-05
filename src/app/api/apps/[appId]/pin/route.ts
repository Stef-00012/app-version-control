import db, { schema } from "@/db/db";
import type { APIAppsPinPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { and, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ appId: string }> }) {
    const authUser = await checkAuth(req);
    
    if (!authUser) return new Response("Unauthorized", { status: 401 });

    const { appId } = await params;

    const appData = await db.query.apps.findFirst({
        where: and(
            eq(schema.apps.appId, Number(appId)),
            eq(schema.apps.ownerId, authUser.id)
        )
    })

    if (!appData) return Response.json({ error: "App not found" }, { status: 404 });

    return Response.json({ pinned: appData.pinned || false })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ appId: string }> }) {
    const authUser = await checkAuth(req);

    if (!authUser) return new Response("Unauthorized", { status: 401 });

    const { appId } = await params;

    const appData = await db.query.apps.findFirst({
        where: and(
            eq(schema.apps.appId, Number(appId)),
            eq(schema.apps.ownerId, authUser.id)
        )
    })

    if (!appData) return Response.json({ error: "App not found" }, { status: 404 });

    const body = await req.json() as APIAppsPinPatchBody;

    if (!body || typeof body.pinned !== "boolean") return Response.json({ error: "Invalid body" }, { status: 400 });

    const newAppData = await db
        .update(schema.apps)
        .set({
            pinned: body.pinned
        })
        .where(
            and(
                eq(schema.apps.appId, Number(appId)),
                eq(schema.apps.ownerId, authUser.id)
            )
        )
        .returning();

    return Response.json(newAppData[0]);
}