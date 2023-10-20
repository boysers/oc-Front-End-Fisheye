"use strict";

import { createMediaCardFactory } from "../factories/mediaCardFactory";
import { mediaCardTemplate } from "../templates/mediaCardTemplate";

/**
 * @typedef {Object} MediaSectionOptions
 * @property {Array<import('../types.js').IMedia>} media
 * @property {import('../types.js').IMediaMap} likedMediaMap
 * @property {(e: Event) => void} [onClick]
 * @property {(e: KeyboardEvent) => void} [onKeydown]
 */

/**
 * Creates and manages a Media Section component.
 * @param {string} selector
 * @param {MediaSectionOptions} options
 * @returns {[HTMLElement, { updateMediaSection: () => void }]}
 */
export const MediaSection = (
	selector,
	{ media, likedMediaMap, onClick, onKeydown } = {
		media: [],
		likedMediaMap: {},
	}
) => {
	const mediaSectionElement = document.querySelector(selector);

	const isOnClick = onClick instanceof Function;
	const isOnKeydown = onKeydown instanceof Function;

	/** Function to add/update media items to the media section. */
	const updateMediaSection = () => {
		const mediaTemplates = media.map((mediaItem) => {
			const mediaItemProps = createMediaCardFactory(mediaItem);

			return mediaCardTemplate({
				...mediaItemProps,
				...likedMediaMap[mediaItem.id],
			});
		});

		mediaSectionElement.innerHTML = mediaTemplates.join("");
	};

	/**
	 * Function to handle likes button clicks using keyboard events.
	 * @param {KeyboardEvent} e
	 * @returns {void}
	 */
	const handleLikesButton = (e) => {
		const isEnterSpaceKey = e.key == "Enter" || e.key == " ";

		if (!(e.target instanceof HTMLElement)) return;

		const isLikesButton = e.target.classList.contains("fa-heart");

		if (isEnterSpaceKey && isLikesButton) {
			e.target.click();
		}

		if (isOnKeydown) {
			onKeydown(e);
		}
	};

	if (isOnClick) {
		mediaSectionElement.addEventListener("click", onClick);
	}

	mediaSectionElement.addEventListener("keydown", handleLikesButton);

	// Initial update of the media section.
	updateMediaSection();

	return [mediaSectionElement, { updateMediaSection }];
};
