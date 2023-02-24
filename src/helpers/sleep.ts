export function sleep(ms = 1100) {
	return new Promise((r) => setTimeout(r, ms));
}
