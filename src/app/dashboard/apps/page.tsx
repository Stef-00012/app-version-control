import { useRouter } from "next/navigation";

export default function Apps() {
    const router = useRouter();

    return router.push("/dashboard");
}