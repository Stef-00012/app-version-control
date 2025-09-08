import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiError400ModelRows, apiError401ModelRows, apiAppsPostBodyModelRows, tableHeader } from "@/constants/models";
import Link from "next/link";

export default function AppsDocs() {
    return (
        <>
            <ApiBadge path="/apps" type="GET" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-2xl">
				Model:{" "}
				<Link href="/docs/models/app#App" className="link text-accent font-mono text-xl">
					App[]
				</Link>
			</h3>

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />

            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider large />

            <ApiBadge path="/apps" type="POST" />

            <h3 className="py-4 text-3xl">Body</h3>

            <ModelTable header={tableHeader} rows={apiAppsPostBodyModelRows} />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={201} contentType="application/json" />

            <h3 className="py-4 text-2xl">
				Model:{" "}
				<Link href="/docs/models/app#App" className="link text-accent font-mono text-xl">
					App
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
        </>
    )
}