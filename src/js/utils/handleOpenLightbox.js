/**
 * @typedef {Object} Props
 * @property {(id: number) => void} onMediaItemDisplay
 * @property {IMedia[]} media
 */

/**
 * @param {Event} e
 * @param {Props} param1
 */
export function handleOpenLightbox(e, { onMediaItemDisplay, media }) {
	if (e.target instanceof HTMLImageElement) {
		let currentElement = e.target;
		while (
			currentElement &&
			!currentElement.classList.contains("media-item")
		) {
			currentElement = currentElement.parentElement;
		}

		const mediaItem = media.find(
			(item) =>
				item.id === parseInt(currentElement.getAttribute("data-id"), 10)
		);

		onMediaItemDisplay(mediaItem.id);
	}
}
