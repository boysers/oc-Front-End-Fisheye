import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { MediaSection } from "../components/MediaSection";
import { PhotographHeader } from "../components/PhotographHeader";
import { searchPhotographProfile } from "../utils/searchPhotographerProfile";

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

	const profile = searchPhotographProfile(data, id);
	if (profile instanceof Error) {
		console.error("Error searching photographer profile:", profile.message);
		return;
	}

	const { media, ...photograph } = profile;
	const totalLikes = media.reduce(
		(acc, mediaItem) => acc + mediaItem.likes,
		0
	);

	PhotographHeader(".photograph-header", { photograph, likes: totalLikes });
	MediaSection(".media_section", { media });
}

photographerPage();
