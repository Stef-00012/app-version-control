import db from "@/db/db";
import schema from "@/db/schema";
import type { APIUsersPatchBody } from "@/types/api";
import checkAuth from "@/util/auth";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authUser = await checkAuth(req);
        
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    return NextResponse.json(authUser);
}

export async function PATCH(req: NextRequest) {
    const authUser = await checkAuth(req);
        
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as APIUsersPatchBody;

    if (
        !body ||
        (!body.username && !body.password && body.admin === undefined)
    ) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    await db.update(schema.users).set({
        username: body.username,
        password: body.password,
        admin: body.admin,
    }).where(eq(schema.users.username, authUser.username));

    return new NextResponse(null, { status: 204 });
}

export async function DELETE(req: NextRequest) {
    const authUser = await checkAuth(req);
        
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as APIUsersPatchBody;

    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    await db.delete(schema.users).where(eq(schema.users.username, authUser.username));

    return new NextResponse(null, { status: 204 });
}