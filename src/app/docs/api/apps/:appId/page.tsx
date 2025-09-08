import ApiBadge from "@/components/docs/ApiBadge";
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import ResponsesBadge from "@/components/docs/ResponsesBadge";
import { apiAppsAppDeleteError404ModelRows, apiAppsAppGetError404ModelRows, apiAppsAppPatchBodyModelRows, apiAppsAppPatchError404ModelRows, apiError400ModelRows, apiError401ModelRows, tableHeader } from "@/constants/models";
import Link from "next/link";

export default function AppsAppDocs() {
    return (
        <>
            <ApiBadge path="/apps/:appId" type="GET" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-2xl">
				Model:{" "}
				<Link href="/docs/models/app#App" className="link text-accent font-mono text-xl">
					App
				</Link>
			</h3>

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />
            
            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider />

            <ResponsesBadge type={404} contentType="application/json" />
            
            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiAppsAppGetError404ModelRows} />

            <Divider large />

            <ApiBadge path="/apps/:appId" type="PATCH" />

            <h3 className="py-4 text-3xl">Body</h3>
            
            <ModelTable header={tableHeader} rows={apiAppsAppPatchBodyModelRows} />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={200} contentType="application/json" />

            <h3 className="py-4 text-2xl">
				Model:{" "}
				<Link href="/docs/models/app#App" className="link text-accent font-mono text-xl">
					App
				</Link>
			</h3>

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

            <ModelTable header={tableHeader} rows={apiAppsAppPatchError404ModelRows} />

            <Divider large />

            <ApiBadge path="/apps/:appId" type="DELETE" />

            <h3 className="py-4 text-3xl">Responses</h3>

            <ResponsesBadge type={204} contentType="No Content" />

            <Divider />

            <ResponsesBadge type={401} contentType="application/json" />
            
            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiError401ModelRows} />

            <Divider />

            <ResponsesBadge type={404} contentType="application/json" />
            
            <h3 className="py-4 text-3xl">Model</h3>

            <ModelTable header={tableHeader} rows={apiAppsAppDeleteError404ModelRows} />
        </>
    )
}