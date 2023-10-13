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
// import { Modal } from "../components/Modal/Modal";
// import { FormModal } from "../components/Modal/FormModal";
// import { Lightbox } from "../components/Modal/Lightbox";
// import { handleOpenLightbox } from "../utils/handleOpenLightbox";
// import { SortByComponent } from "../components/SortByComponent";
// import { modalTemplate } from "../templates/modalTemplate";

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

	MediaSection(".media_section", {
		media,
		likedMediaMap,
		onClick(e) {
			handleLikesClick(e, {
				likedMediaMap,
				onIncrementLikes,
				onDecrementLikes,
			});
			// handleOpenLightbox(e, {
			// 	media,
			// 	onMediaItemDisplay,
			// 	toggleModalDisplay,
			// });
		},
	});

	// SortByComponent("#sortby", {
	// 	onChange(_e, sortSelect) {
	// 		sortMediaByOption(media, sortSelect);
	// 		updateMediaSection();
	// 		updateLightbox();
	// 	},
	// });

	// const [modalElement, { toggleModalDisplay }] = Modal("#modal");

	// const [, { onMediaItemDisplay, updateLightbox }] = Lightbox(
	// 	"#lightbox-modal",
	// 	{
	// 		mediaSectionElement,
	// 	}
	// );
}

photographerPage();
