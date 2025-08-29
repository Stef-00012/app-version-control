export default function createToken(userId: number) {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const array = new Uint8Array(96);
	crypto.getRandomValues(array);

	const randomPart = Array.from(array, (n) => charset[n % charset.length]).join(
		"",
	);

	const base64Id = btoa(String(userId));

	return `${base64Id}.${randomPart}`;
}
