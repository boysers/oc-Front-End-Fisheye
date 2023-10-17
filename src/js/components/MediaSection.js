import { createMediaCardFactory } from "../factories/mediaCardFactory";
import { mediaCardTemplate } from "../templates/mediaCardTemplate";

/**
 * @typedef {Object} MediaSectionProps
 * @property {IMedia[]} media
 * @property {IMediaMap} likedMediaMap
 * @property {(e: Event) => void} [onClick]
 * @property {(e: KeyboardEvent) => void} [onKeydown]
 */

/**
 * @param {string} selector
 * @param {MediaSectionProps} options
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

	const updateMediaSection = () => {
		const mediaTemplates = media.map((mediaItem) => {
			return mediaCardTemplate(
				createMediaCardFactory({
					...mediaItem,
					likes: likedMediaMap[mediaItem.id].likes,
				})
			);
		});

		mediaSectionElement.innerHTML = mediaTemplates.join("");
	};

	updateMediaSection();

	const handleLikesButton = (e) => {
		const isEnterSpaceKey = e.key == "Enter" || e.key == " ";

		if (!(e.target instanceof HTMLElement)) return;

		const isLikesButton = e.target.classList.contains("fa-heart");

		if (isEnterSpaceKey && isLikesButton) {
			e.target.click();
		}

		if (onKeydown instanceof Function) {
			onKeydown(e);
		}
	};

	if (onClick instanceof Function) {
		mediaSectionElement.addEventListener("click", (e) => {
			onClick(e);
		});
	}

	mediaSectionElement.addEventListener("keydown", handleLikesButton);

	return [mediaSectionElement, { updateMediaSection }];
};
