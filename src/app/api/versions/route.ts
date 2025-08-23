import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// no auth - get version data
export async function GET() {
	return NextResponse.json({});
}

// auth - create new version
export async function POST() {
    return NextResponse.json({});
}

// auth - update version
export async function PATCH() {
    return NextResponse.json({});
}

// auth - delete version
export async function DELETE() {
    return NextResponse.json({});
}