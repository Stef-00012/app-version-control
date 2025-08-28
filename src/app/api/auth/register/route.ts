import db, { schema } from "@/db/db";
import type { APIAuthPostBody } from "@/types/api";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = (await req.json()) as APIAuthPostBody;

    if (!body || !body.username || !body.password)
        return NextResponse.json({ error: "Invalid body" }, { status: 400 });

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
        })

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
    });

    return new NextResponse(null, { status: 204 });
}
