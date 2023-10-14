import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { MediaSection } from "../components/MediaSection";
import { PhotographHeader } from "../components/PhotographHeader";
import { searchPhotographProfile } from "../utils/searchPhotographerProfile";
import { handleLikesClick } from "../utils/handleLikesClick";
import { calculateTotalLikes } from "../utils/calculateTotalLikes";
import { getPhotographerIdFromURL } from "../utils/getPhotographerIdFormURL";
import { sortMediaByOption } from "../utils/sortMediaByOption";
import { createLikesMediaMap } from "../utils/createLikesMediaMap";
import { ContactFormModal } from "../components/ContactFormModal";
import { setDocumentTitle } from "../utils/setDocumentTitle";
import { SortByComponent } from "../components/SortByComponent";
import { LightboxModal } from "../components/LightboxModal";
import { handleOpenLightbox } from "../utils/handleOpenLightbox";

async function photographerPage() {
	const photographerId = getPhotographerIdFromURL();
	if (!photographerId) {
		console.error("Invalid photographer ID");
		return;
	}

	const data = await fetchPhotographersJSON();
	if (data instanceof Error) {
		console.error("Error fetching photographer data:", data.message);
		return;
	}

	const profile = searchPhotographProfile(data, photographerId);
	if (profile instanceof Error) {
		console.error("Error searching photographer profile:", profile.message);
		return;
	}

	const { media, ...photograph } = profile;

	const totalLikes = calculateTotalLikes(media);
	const likedMediaMap = createLikesMediaMap(media);

	setDocumentTitle(photograph.name);
	sortMediaByOption(media, "popularity");

	const [, { onIncrementLikes, onDecrementLikes, contactMeBtn }] =
		PhotographHeader(".photograph-header", { photograph, totalLikes });

	ContactFormModal("#formModal", {
		title: photograph.name,
		openModalBtnElement: contactMeBtn,
	});

	const [mediaSectionElement,{ updateMediaSection }] = MediaSection(
		".media_section",
		{
			media,
			likedMediaMap,
			onClick(e) {
				handleLikesClick(e, {
					likedMediaMap,
					onIncrementLikes,
					onDecrementLikes,
				});
				handleOpenLightbox(e, {
					media,
					onMediaItemDisplay,
				});
			},
		}
	);

	SortByComponent("#sortby", {
		onChange(_e, sortSelect) {
			sortMediaByOption(media, sortSelect);
			updateMediaSection();
			updateLightbox();
		},
	});

	const [, { updateLightbox, onMediaItemDisplay }] = LightboxModal(
		"#lightboxModal",
		{ media, mediaSectionElement }
	);
}

photographerPage();
