import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiAuthPlatforms403ErrorModelRows, apiError400ModelRows, apiError401ModelRows, apiPlatformsPostBodyModelRows, tableHeader } from "@/constants/models";
import Link from "next/link";

export default function PlatformsDocs() {
    return (
        <>
            <ApiBadge path="/platforms" type="GET" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-2xl">
				Model:{" "}
				<Link href="/docs/models/platform#Platform" className="link text-accent font-mono text-xl">
					Platform[]
				</Link>
			</h3>

            <Divider large />

            <ApiBadge path="/platforms" type="POST" />

            <h3 className="py-4 text-3xl">Body</h3>

            <ModelTable header={tableHeader} rows={apiPlatformsPostBodyModelRows} />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={201} contentType="application/json" />

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

            <ResponsesBadge type={403} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiAuthPlatforms403ErrorModelRows} />
        </>
    )
}