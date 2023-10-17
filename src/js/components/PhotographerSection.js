import { cardTemplate } from "../templates/cardTemplate";

/**
 * @typedef {Object} PhotographerSectionProps
 * @property {IPhotographer[]} photographers
 */

/**
 * @param {string} selector
 * @param {PhotographerSectionProps} options
 * @returns {[HTMLElement]}
 */
export const PhotographerSection = (selector, { photographers }) => {
	const photographerSectionElement = document.querySelector(selector);

	const photographerTemplates = photographers.map(
		({ city, country, id, name, portrait, price, tagline }) =>
			cardTemplate({
				title: name,
				href: `photographer.html?id=${id}`,
				src: `photographers/${portrait}`,
				location: `${city}, ${country}`,
				tjm: `${price}€/jour`,
				tagline,
			})
	);
	photographerSectionElement.innerHTML += photographerTemplates.join("");

	return [photographerSectionElement];
};
