export function getPhotographerIdFromURL() {
	const idParam = new URL(location.href).searchParams.get("id");
	return parseInt(idParam, 10);
}
