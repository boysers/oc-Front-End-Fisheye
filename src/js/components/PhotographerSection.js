"use strict";

import { cardTemplate } from "../templates/cardTemplate";

/**
 * @typedef {Object} PhotographerSectionOptions
 * @property {Array<import('../types.js').IPhotographer>} photographers
 */

/**
 * Creates a Photographer Section.
 * @param {string} selector
 * @param {PhotographerSectionOptions} options
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
