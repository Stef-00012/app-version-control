/** biome-ignore-all lint/correctness/useUniqueElementIds: Static ID is required for navigation */
import Divider from "@/components/docs/Divider";
import ModelTable from "@/components/docs/ModelTable";
import { versionModelRows, tableHeader, versionPlatformsModelRows } from "@/constants/models";
import Link from "next/link";

export default function VersionModel() {
    return (
        <div className="flex flex-col">
            <Link className="text-5xl link text-accent" href="#Version" id="Version">
                Version
            </Link>

            <p className="py-2">Represents a version.</p>

            <h3 className="text-3xl py-2">Fields</h3>

            <ModelTable header={tableHeader} rows={versionModelRows} />

            <Divider />

            <Link className="text-5xl link text-accent" href="#VersionPlatforms" id="VersionPlatforms">
                VersionPlatforms
            </Link>

            <p className="py-2">Represents an object with the platforms the version is available on.</p>

            <h3 className="text-3xl py-2">Fields</h3>

            <ModelTable header={tableHeader} rows={versionPlatformsModelRows} />
        </div>
    )
}