"use strict";

/**
 * @typedef {Object} Props
 * @property {(id: number) => void} onMediaItemDisplay
 * @property {Array<import('../types.js').IMedia>} media
 */

/**
 * Handles opening the lightbox on a media item click.
 * @param {Event} e
 * @param {Props} param1
 */
export function handleOpenLightbox(e, { onMediaItemDisplay, media }) {
	const isHTMLImageElement = e.target instanceof HTMLImageElement;

	if (!isHTMLImageElement) return;

	let currentElement = e.target;
	while (currentElement && !currentElement.classList.contains("media-item")) {
		currentElement = currentElement.parentElement;
	}

	if (!currentElement) return;

	const mediaItem = media.find(
		(item) =>
			item.id === parseInt(currentElement.getAttribute("data-id"), 10)
	);

	onMediaItemDisplay(mediaItem.id);
}
