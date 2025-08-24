import { redirect } from "next/navigation";
import checkAuth from "@/util/auth";

export default async function Home() {
	const authUser = await checkAuth();

	if (!authUser) return redirect("/login");

	return redirect("/dashboard");
}
