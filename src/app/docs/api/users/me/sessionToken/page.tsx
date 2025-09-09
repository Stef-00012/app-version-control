import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiError401ModelRows, apiUsersMeSessionTokenGetResponseModelRows, tableHeader } from "@/constants/models";

export default function UsersMeSessionTokenDocs() {
    return (
        <>
            <ApiBadge path="/users/me/sessionToken" type="GET" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiUsersMeSessionTokenGetResponseModelRows} />

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />
        </>
    )
}