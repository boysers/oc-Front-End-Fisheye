/**
 * @typedef {Object} IMediaMap
 * @property {number} likes
 * @property {boolean} hasLiked
 */

/**
 * @typedef {Object} CallbackLikes
 * @property {() => void} onIncrementLikes
 * @property {() => void} onDecrementLikes
 */

/** @typedef {CallbackLikes & { likedMediaMap: IMediaMap }} handleLikesProps */

/**
 * @param {Event} e
 * @param {handleLikesProps} param1
 */
export const handleLikesClick = (
	e,
	{ onIncrementLikes, onDecrementLikes, likedMediaMap }
) => {
	if (!(e.target instanceof HTMLElement)) return;
	const element = e.target;

	const likesBtn = findLikesBtn(element);
	if (!likesBtn) return;

	const mediaItem = findMediaItem(element);
	if (!mediaItem) return;

	const id = mediaItem.getAttribute("data-id");
	if (!id) return;

	const likesElement = likesBtn.previousElementSibling;

	likesBtn.setAttribute("aria-live", "polite");
	likesBtn.setAttribute("aria-atomic", "true");

	if (likedMediaMap[id].hasLiked) {
		likedMediaMap[id].hasLiked = false;
		likedMediaMap[id].likes -= 1;
		updateLikesBtn(likesElement, likedMediaMap[id].likes);
		callLikesCallback(onDecrementLikes);
		return;
	}

	likedMediaMap[id].hasLiked = true;
	likedMediaMap[id].likes += 1;
	updateLikesBtn(likesElement, likedMediaMap[id].likes);

	callLikesCallback(onIncrementLikes);
};

/**
 * @param {HTMLElement} element
 * @returns {HTMLElement | null}
 */
function findLikesBtn(element) {
	const isLikesBtn = element.classList.contains("fa-heart");
	if (!isLikesBtn) return null;
	return element;
}

/**
 * @param {HTMLElement} element
 * @returns {HTMLElement | null}
 */
function findMediaItem(element) {
	let currentElement = element;
	while (currentElement && !currentElement.classList.contains("media-item")) {
		currentElement = currentElement.parentElement;
	}
	return currentElement;
}

/**
 * @param {HTMLElement} element
 * @param {number} likes
 */
function updateLikesBtn(element, likes) {
	if (element) {
		element.innerText = likes.toString();
	}
}

/** @param {() => void} callback */
function callLikesCallback(callback) {
	if (callback instanceof Function) {
		callback();
	}
}
