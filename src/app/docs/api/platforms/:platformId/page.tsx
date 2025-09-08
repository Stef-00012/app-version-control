import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiAPlatformsPlatformPatchBodyModelRows, apiError400ModelRows, apiError401ModelRows, apiPlatformsPlatformGetError404ModelRows, tableHeader } from "@/constants/models";
import Link from "next/link";

export default function PlatformsPlatformDocs() {
    return (
        <>
            <ApiBadge path="/platforms/:platformId" type="GET" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-2xl">
                Model:{" "}
                <Link href="/docs/models/platform#Platform" className="link text-accent font-mono text-xl">
                    Platform
                </Link>
            </h3>

            <Divider />

            <ResponsesBadge type={404} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiPlatformsPlatformGetError404ModelRows} />

            <Divider large />

            <ApiBadge path="/platforms/:platformId" type="PATCH" />

            <h3 className="py-4 text-3xl">Body</h3>

            <ModelTable header={tableHeader} rows={apiAPlatformsPlatformPatchBodyModelRows} />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-2xl">
                Model:{" "}
                <Link href="/docs/models/platform#Platform" className="link text-accent font-mono text-xl">
                    Platform
                </Link>
            </h3>

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

            <ModelTable header={tableHeader} rows={apiPlatformsPlatformGetError404ModelRows} />

            <Divider large />

            <ApiBadge path="/platforms/:platformId" type="DELETE" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={204} contentType="No Content" />

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider />

            <ResponsesBadge type={404} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiPlatformsPlatformGetError404ModelRows} />
        </>
    )
}