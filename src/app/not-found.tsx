export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-bold">404 - Page Not Found</h1>
			<p className="mt-4">The page you are looking for does not exist.</p>
			<a className="text-accent underline" href="/dashboard">
				Go back to Dashboard
			</a>
		</div>
	);
}
