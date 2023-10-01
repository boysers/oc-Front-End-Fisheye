import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { searchPhotographerProfile } from "../utils/searchPhotographerProfile";

async function photographerPage() {
	const idParam = new URL(location.href).searchParams.get("id");
	const id = parseInt(idParam, 10);

	if (!id) {
		console.error("Invalid photographer ID");
		return;
	}

	const data = await fetchPhotographersJSON();

	if (data instanceof Error) {
		console.error("Error fetching photographer data:", data.message);
		return;
	}

	const profile = searchPhotographerProfile(data, id);

	if (profile instanceof Error) {
		console.error("Error searching photographer profile:", profile.message);
		return;
	}

	console.log(profile);
}

photographerPage();
