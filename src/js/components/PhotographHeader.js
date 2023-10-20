"use strict";

import { photographHeaderTemplate } from "../templates/photographHeaderTemplate";
import { isInstanceofHTMLElement } from "../utils/isInstanceofHTMLElement";

/**
 * @typedef {Object} PhotographHeaderOptions
 * @property {Array<import('../types.js').IPhotographer>} photograph
 * @property {number} [totalLikes=0]
 */

/***
 * Creates a Photograph Header.
 * @param {string} selector
 * @param {PhotographHeaderOptions} options
 * @returns {[HTMLElement, { onIncrementLikes: () => void, onDecrementLikes: () => void, contactMeBtn: HTMLElement | null }]}
 */
export const PhotographHeader = (
	selector,
	{ photograph, totalLikes: likes = 0 }
) => {
	const photographHeaderElement = document.querySelector(selector);

	const { name, city, portrait, tagline, country, price } = photograph;
	photographHeaderElement.innerHTML = photographHeaderTemplate({
		title: name,
		src: `photographers/${portrait}`,
		location: `${city}, ${country}`,
		tagline,
		likes,
		tjm: `${price}€/jour`,
	});

	const contactMeBtn = photographHeaderElement.querySelector(
		'[data-js="open-modal"]'
	);

	const likesElement = photographHeaderElement.querySelector("#total-likes");
	const isLikesElement = isInstanceofHTMLElement(likesElement);

	// Callback function to increment likes.
	const onIncrementLikes = () => {
		if (!isLikesElement) return;
		likesElement.innerText = (likes = likes + 1).toString();
	};

	// Callback function to decrement likes.
	const onDecrementLikes = () => {
		if (!isLikesElement) return;
		likesElement.innerText = (likes = likes - 1).toString();
	};

	return [
		photographHeaderElement,
		{ onIncrementLikes, onDecrementLikes, contactMeBtn },
	];
};
