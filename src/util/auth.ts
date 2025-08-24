import db from "@/db/db";
import schema from "@/db/schema";
import { sql } from "drizzle-orm";
import type { NextRequest } from "next/server";

export default async function checkAuth(req: NextRequest, admin?: boolean): Promise<null | typeof schema.users.$inferSelect> {
    const auth = req.headers.get("Authorization");
    
    if (!auth)
        return null;

    console.log(auth)

    const res = await db
        .select()
        .from(schema.users)
        .where(
            sql`JSON_TYPE(${schema.users.tokens}) = 'array' AND EXISTS (
            SELECT 1 FROM JSON_EACH(${schema.users.tokens}) WHERE value = ${auth}
            )`
        )
        .limit(1);

    const user = res[0];

    // const user = await db.query.users.findFirst({
    //     where: sql`${auth} IN (${schema.users.tokens})`
    // });

    console.log(user)

    if (!user) return null;
    if (admin && !user.admin) return null;

    return user;
}