import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { MediaSection } from "../components/MediaSection";
import { PhotographHeader } from "../components/PhotographHeader";
import { searchPhotographProfile } from "../utils/searchPhotographerProfile";
import { setupMediaEventListeners } from "../utils/setupMediaEventListeners";
import { handleLikesClick } from "../utils/handleLikesClick";
import { calculateTotalLikes } from "../utils/calculateTotalLikes";
import { getPhotographerIdFromURL } from "../utils/getPhotographerIdFormURL";
import { createMediaMap } from "../utils/createMediaMap";
import { Modal } from "../components/Modal";
import { FormModal } from "../components/FormModal";

async function photographerPage() {
	const id = getPhotographerIdFromURL();
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
	const totalLikes = calculateTotalLikes(media);
	const mediaMap = createMediaMap(media);

	const [
		_photographHeaderElement,
		{ onIncrementLikes, onDecrementLikes, contactMeBtn },
	] = PhotographHeader(".photograph-header", {
		photograph,
		likes: totalLikes,
	});

	const [mediaSectionElement] = MediaSection(".media_section", { media });

	setupMediaEventListeners(mediaSectionElement, (e) => {
		handleLikesClick(e, { mediaMap, onIncrementLikes, onDecrementLikes });
	});

	const [modalElement, { toggleModalDisplay }] = Modal("#modal");

	FormModal(
		{ modalElement, openBtnElement: contactMeBtn },
		{ title: profile.name, toggleModalDisplay }
	);
}

photographerPage();
