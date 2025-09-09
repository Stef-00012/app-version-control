/** biome-ignore-all lint/correctness/useUniqueElementIds: Static ID is required for navigation */
import ModelTable from "@/components/docs/ModelTable";
import { appModelRows, tableHeader } from "@/constants/models";
import Link from "next/link";

export default function AppModel() {
    return (
        <div className="flex flex-col">
            <Link className="text-5xl link text-accent" href="#App" id="App">
				App
			</Link>

            <p className="py-2">Represents an app.</p>

            <h3 className="text-3xl py-2">Fields</h3>

            <ModelTable header={tableHeader} rows={appModelRows} />
        </div>
    )
}