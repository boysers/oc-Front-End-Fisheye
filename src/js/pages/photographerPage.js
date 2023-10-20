"use strict";

import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { MediaSection } from "../components/MediaSection";
import { PhotographHeader } from "../components/PhotographHeader";
import { searchPhotographProfileByID } from "../utils/searchPhotographerProfileByID";
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

	// To be replaced by the API REST
	const data = await fetchPhotographersJSON();
	if (data instanceof Error) {
		console.error("Error fetching photographer data:", data.message);
		return;
	}

	// To be replaced by the API REST
	const profile = searchPhotographProfileByID(data, photographerId);
	if (profile instanceof Error) {
		console.error("Error searching photographer profile:", profile.message);
		return;
	}

	const { media, ...photograph } = profile;

	const totalLikes = calculateTotalLikes(media);
	const likedMediaMap = createLikesMediaMap(media);

	// Set document totle with photographer name
	setDocumentTitle(photograph.name);

	// Sort media by popularity default
	sortMediaByOption(media, "popularity");

	// Create PhotographHeader component
	const [, { onIncrementLikes, onDecrementLikes, contactMeBtn }] =
		PhotographHeader(".photograph-header", { photograph, totalLikes });

	// Create ContactFormModal component
	ContactFormModal("#formModal", {
		title: photograph.name,
		openModalBtnElement: contactMeBtn,
	});

	// Create MediaSection component
	const [mediaSectionElement, { updateMediaSection }] = MediaSection(
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

	// Create SortByComponent for sorting media
	SortByComponent("#sortby", {
		onChange(_e, sortSelect) {
			sortMediaByOption(media, sortSelect);
			updateMediaSection();
			updateLightbox();
		},
	});

	// Create LightboxModal component
	const [, { updateLightbox, onMediaItemDisplay }] = LightboxModal(
		"#lightboxModal",
		{ media, mediaSectionElement }
	);
}

photographerPage();
