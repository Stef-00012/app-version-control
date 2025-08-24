import db, { schema } from "@/db/db";
import type { APIAuthPostBody } from "@/types/api";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = (await req.json()) as APIAuthPostBody;

    if (!body || !body.username || !body.password)
        return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const user = await db.query.users.findFirst({
        where: and(
            eq(schema.users.username, body.username),
        ),
    });

    if (user)
        return NextResponse.json({ error: "Username already in use" }, { status: 400 });

    const token = crypto.randomUUID();

    const username = body.username;
    const password = body.password;
    const tokens = [token];

    await db
        .insert(schema.users)
        .values({
            username,
            password,
            tokens,
            admin: false,
        })

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
    });

    return new NextResponse(null, { status: 204 });
}
