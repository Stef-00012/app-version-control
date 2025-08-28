import db from "@/db/db";
import schema from "@/db/schema";
import type { APIPlatformsPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const platformData = await db.query.platforms.findFirst({
        where: eq(schema.platforms.id, id),
    });

    if (!platformData)
        return NextResponse.json({ error: "Platform not found" }, { status: 404 });

	return NextResponse.json(platformData);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const authUser = await checkAuth(req, true);
    
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as APIPlatformsPatchBody;

    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const { id } = await params;

    const platformData = await db.query.platforms.findFirst({
        where: eq(schema.platforms.id, id),
    });

    if (!platformData)
        return NextResponse.json({ error: "Platform not found" }, { status: 404 });

    const newPlatform = await db.update(schema.platforms).set({
        name: body.name ?? platformData.name,
    }).where(eq(schema.platforms.id, id)).returning();

	return NextResponse.json(newPlatform[0]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const authUser = await checkAuth(req, true);
    
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const platformData = await db.query.platforms.findFirst({
        where: eq(schema.platforms.id, id),
    });

    if (!platformData)
        return NextResponse.json({ error: "Platform not found" }, { status: 404 });

    await db.delete(schema.platforms).where(eq(schema.platforms.id, id));

	return new NextResponse(null, { status: 204 });
}