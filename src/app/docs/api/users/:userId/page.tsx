import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiError400ModelRows, apiError401ModelRows, apiUsersUserGetError404ModelRows, apiUsersUserPatchBodyModelRows, tableHeader } from "@/constants/models";
import Link from "next/link";

export default function UsersUserDocs() {
    return (
        <>
            <ApiBadge path="/users/:userId" type="GET" />

            <h3 className="py-4 text-3xl">Responses</h3>
            
            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-2xl">
                Model:{" "}
                <Link href="/docs/models/user#User" className="link text-accent font-mono text-xl">
                    User
                </Link>
            </h3>

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider />

            <ResponsesBadge type={404} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiUsersUserGetError404ModelRows} />

            <Divider large />

            <ApiBadge path="/users/:userId" type="PATCH" />

            <h3 className="py-4 text-3xl">Body</h3>

            <ModelTable header={tableHeader} rows={apiUsersUserPatchBodyModelRows} />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={204} contentType="No Content" />

            <Divider />

            <ResponsesBadge type={400} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError400ModelRows} />

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider />

            <ResponsesBadge type={404} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiUsersUserGetError404ModelRows} />

            <Divider large />

            <ApiBadge path="/users/:userId" type="DELETE" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={204} contentType="No Content" />

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider />

            <ResponsesBadge type={404} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiUsersUserGetError404ModelRows} />
        </>
    )
}