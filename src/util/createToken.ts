export default function createToken(username: string) {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const array = new Uint8Array(96);
	crypto.getRandomValues(array);

	const randomPart = Array.from(array, (n) => charset[n % charset.length]).join(
		"",
	);

	const base64Username = btoa(username);

	return `${base64Username}.${randomPart}`;
}
