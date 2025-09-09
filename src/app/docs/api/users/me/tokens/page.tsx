import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiError400ModelRows, apiError401ModelRows, apiUsersMeTokensGetResponseModelRows, apiUsersMeTokensPatchBodyModelRows, apiUsersMeTokensPatchError404ModelRows, apiUsersUserMeTokensPostResponseModelRows, tableHeader } from "@/constants/models";

export default function UsersMeTokens() {
    return (
        <>
            <ApiBadge path="/users/me/tokens" type="GET" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiUsersMeTokensGetResponseModelRows} />

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider large />

            <ApiBadge path="/users/me/tokens" type="PATCH" />

            <h3 className="py-4 text-3xl">Body</h3>

            <ModelTable header={tableHeader} rows={apiUsersMeTokensPatchBodyModelRows} />

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

            <ModelTable header={tableHeader} rows={apiUsersMeTokensPatchError404ModelRows} />

            <Divider large />

            <ApiBadge path="/users/me/tokens" type="POST" />

            <h3 className="py-4 text-3xl">Body</h3>

            <h3 className="py-4 text-2xl">
                Model:{" "}
                <p className="font-mono text-xl">None</p>
            </h3>

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiUsersUserMeTokensPostResponseModelRows} />

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />
        </>
    )
}