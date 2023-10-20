"use strict";

/**
 * @typedef {Object} MediaCardLightboxTemplateProps
 * @property {string} title
 * @property {string} src
 * @property {number} id
 * @property {string | undefined} video
 */

/**
 * @param {MediaCardLightboxTemplateProps} props
 * @returns {import('../types.js').HTMLTemplate}
 */
export const mediaCardLightboxTemplate = ({ title, src, id, video }) => {
	const media = video
		? `<video src="${video}" controls aria-label="Contrôles vidéo"></video>`
		: `<img src="${src}" alt="${title}"/>`;

	return `
        <li data-id="${id}" class="media-item" aria-label="${title}">
            <figure>
                ${media}
                <figcaption>${title}</figcaption>
            </figure>
        </li>
    `;
};
