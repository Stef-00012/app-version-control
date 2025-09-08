import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiAuthRegister403ErrorModelRows, apiAuthRegisterPostBodyModelRows, apiError400ModelRows, tableHeader } from "@/constants/models";

export default function AuthRegisterDocs() {
    return (
        <>
            <ApiBadge path="/auth/register" type="POST" />

            <h3 className="py-4 text-3xl">Body</h3>
            
            <ModelTable header={tableHeader} rows={apiAuthRegisterPostBodyModelRows} />

            <h3 className="py-4 text-3xl">Responses</h3>
            
            <ResponsesBadge type={204} contentType="No Content" />

            <Divider />

            <ResponsesBadge type={400} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError400ModelRows} />

            <Divider />

            <ResponsesBadge type={403} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiAuthRegister403ErrorModelRows} />
        </>
    )
}