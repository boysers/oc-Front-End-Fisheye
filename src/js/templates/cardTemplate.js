"use strict";

/**
 * @typedef {Object} CardTemplateProps
 * @property {string} title
 * @property {string} href
 * @property {string} src
 * @property {string} location
 * @property {string} tjm - tarif journalier moyen
 * @property {string} tagline
 */

/**
 * @param {CardTemplateProps} props
 * @returns {import('../types.js').HTMLTemplate}
 */
export const cardTemplate = ({ href, location, src, title, tjm, tagline }) => {
	return `
		<article>
			<a href="${href}" aria-label="${title}">
				<img src="${src}" alt="" />
				<h2>${title}</h2>
			</a>
			<p>${location}</p>
			<p>${tagline}</p>
			<p aria-label="Tarif journalier moyen">${tjm}</p>
		</article>
	`;
};
