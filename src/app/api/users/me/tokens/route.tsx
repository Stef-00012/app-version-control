import db, { schema } from "@/db/db";
import checkAuth from "@/util/auth";
import createToken from "@/util/createToken";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const authUser = await checkAuth(req, false)

    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    return NextResponse.json({ tokens: authUser.tokens })
}

export async function PATCH(req: NextRequest) {
    const authUser = await checkAuth(req, false)

    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json() as { token: string };

    if (!body || !body.token) return NextResponse.json({ error: "Invalid body" }, { status: 400 })

    const removeToken = body.token

    if (!authUser.tokens.includes(removeToken)) return NextResponse.json({ error: "Token not found" }, { status: 404 })

    const newTokens = authUser.tokens.filter(token => token !== removeToken)

    await db
        .update(schema.users)
        .set({
            tokens: newTokens
        })
        .where(
            eq(schema.users.id, authUser.id)
        )

    return new NextResponse(null, { status: 204 })
}

export async function POST(req: NextRequest) {
    const authUser = await checkAuth(req, false)

    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const newToken = createToken(authUser.id)

    const newTokens = [...authUser.tokens, newToken]

    await db
        .update(schema.users)
        .set({
            tokens: newTokens
        })
        .where(
            eq(schema.users.id, authUser.id)
        )

    return NextResponse.json({
        token: newToken
    })
}