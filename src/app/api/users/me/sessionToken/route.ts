import checkAuth from "@/util/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const authData = await checkAuth(req, false, true)

    if (!authData) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    return NextResponse.json({ token: authData.token })
}