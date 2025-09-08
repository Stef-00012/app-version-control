import Link from "next/link";

export default function DocsHome() {
    return (
        <>
            <h1 className="text-3xl font-bold">App Version Control Documentation</h1>

            <p>
                Welcome to the App Version Control documentation! Here you can find information about the API and how to use it.
            </p>

            <h2 className="text-2xl pt-6 font-bold">API Documentation</h2>

            <p>The API is available on the <Link href="/docs/api" className="link text-accent"><code>/api</code></Link> endpoint and it allows you to retrieve informations about a specific app, version or supported platform.</p>
        </>
    )
}