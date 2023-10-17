import { photographHeaderTemplate } from "../templates/photographHeaderTemplate";

/**
 * @typedef {Object} PhotographHeaderProps
 * @property {IPhotographer} photograph
 * @property {number} [totalLikes=0]
 */

/**
 * @param {string} selector
 * @param {PhotographHeaderProps} options
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

	const likesElement = photographHeaderElement.querySelector(
		".photographer-info > :nth-child(1) > span"
	);
	const onIncrementLikes = () => {
		if (likesElement instanceof HTMLElement) {
			likesElement.innerText = (likes = likes + 1).toString();
		}
	};
	const onDecrementLikes = () => {
		if (likesElement instanceof HTMLElement) {
			likesElement.innerText = (likes = likes - 1).toString();
		}
	};

	const contactMeBtn = photographHeaderElement.querySelector(
		"[data-js='open-modal'"
	);

	return [
		photographHeaderElement,
		{ onIncrementLikes, onDecrementLikes, contactMeBtn },
	];
};
