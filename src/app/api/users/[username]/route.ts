import db from "@/db/db";
import schema from "@/db/schema";
import type { APIUsersPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    const authUser = await checkAuth(req, true);
        
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { username } = await params;

    const user = await db.query.users.findFirst({
        where: eq(schema.users.username, username),
        columns: {
            password: false,
            tokens: false,
        }
    });

    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    const authUser = await checkAuth(req, true);
        
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as APIUsersPatchBody;

    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const { username } = await params;

    const userData = await db.query.users.findFirst({
        where: eq(schema.users.username, username),
    });

    if (!userData)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    await db.update(schema.users).set({
        username: body.username ?? userData.username,
        password: body.password ?? userData.password,
        admin: body.admin ?? userData.admin,
    }).where(eq(schema.users.username, username));

    return new NextResponse(null, { status: 204 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    const authUser = await checkAuth(req, true);
        
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as APIUsersPatchBody;

    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const { username } = await params;

    const userData = await db.query.users.findFirst({
        where: eq(schema.users.username, username),
    });

    if (!userData)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    await db.delete(schema.users).where(eq(schema.users.username, username));

    return new NextResponse(null, { status: 204 });
}