"use strict";

import { isInstanceofHTMLElement } from "./isInstanceOfHTMLElement.js";

/**
 * @typedef {Object} CallbackLikes
 * @property {() => void} onIncrementLikes
 * @property {() => void} onDecrementLikes
 */

/** @typedef {CallbackLikes & { likedMediaMap: import('../types.js').IMediaMap }} handleLikesProps */

/**
 * Handles the click event for managing likes on media items.
 * @param {Event} e
 * @param {handleLikesProps} param1
 */
export const handleLikesClick = (
	e,
	{ onIncrementLikes, onDecrementLikes, likedMediaMap }
) => {
	if (!isInstanceofHTMLElement(e.target)) return;
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

		updateLikesElement(likesElement, likedMediaMap[id].likes);
		updateLikesBtn(likesBtn, likedMediaMap[id].hasLiked);

		callLikesCallback(onDecrementLikes);
		return;
	}

	likedMediaMap[id].hasLiked = true;
	likedMediaMap[id].likes += 1;

	updateLikesElement(likesElement, likedMediaMap[id].likes);
	updateLikesBtn(likesBtn, likedMediaMap[id].hasLiked);

	callLikesCallback(onIncrementLikes);
};

/**
 * Finds the likes button in the element parent.
 * @param {HTMLElement} element
 * @returns {HTMLElement | null}
 */
function findLikesBtn(element) {
	const isLikesBtn = element.classList.contains("fa-heart");
	if (!isLikesBtn) return null;
	return element;
}

/**
 * Finds the parent element "media-item" of the child element
 * @param {HTMLElement} element - child media item
 * @returns {HTMLElement | null} - Media Item Element
 */
function findMediaItem(element) {
	let currentElement = element;
	while (currentElement && !currentElement.classList.contains("media-item")) {
		currentElement = currentElement.parentElement;
	}
	return currentElement;
}

/**
 * Updates the likes count.
 * @param {HTMLElement} element
 * @param {number} likes
 */
function updateLikesElement(element, likes) {
	if (!isInstanceofHTMLElement(element)) return;
	element.innerText = likes.toString();
}

/**
 * Updates visual style of the likes button.
 * @param {HTMLElement} element
 * @param {number} likes
 */
function updateLikesBtn(element, hasLiked) {
	if (!isInstanceofHTMLElement(element)) return;

	if (hasLiked) {
		element.classList.remove("fa-regular");
		element.classList.add("fa-solid");
		return;
	}

	element.classList.add("fa-regular");
	element.classList.remove("fa-solid");
}

/**
 * Calls Callback function, verif if the type valid function.
 * @param {() => void} callback
 * */
function callLikesCallback(callback) {
	if (callback instanceof Function) {
		callback();
	}
}
