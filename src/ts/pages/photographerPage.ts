import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { MediaSection } from "../components/MediaSection";
import { PhotographHeader } from "../components/PhotographHeader";
import { searchPhotographProfile } from "../utils/searchPhotographerProfile";
import { setupMediaLikesEventListeners } from "../utils/setupMediaLikesEventListeners";

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

	const [_photographHeaderElement, { onIncrementLikes, onDecrementLikes }] =
		PhotographHeader(".photograph-header", {
			photograph,
			likes: totalLikes,
		});

	const [mediaSectionElement, { likesMap }] = MediaSection(".media_section", {
		media,
	});
	setupMediaLikesEventListeners(mediaSectionElement, likesMap, {
		onIncrementLikes,
		onDecrementLikes,
	});
}

photographerPage();
