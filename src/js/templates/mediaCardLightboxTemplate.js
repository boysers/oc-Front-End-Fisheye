/**
 * @typedef {Object} MediaCardProps
 * @property {string} title
 * @property {string} src
 * @property {number} id
 * @property {string} [video]
 */

/**
 * @param {MediaCardProps} props
 * @returns {string}
 */
export const mediaCardLightboxTemplate = ({ title, src, id, video }) => {
	return `
        <li data-id="${id}" class="media-item" aria-label="${title}">
            <figure>
                ${
					video
						? `<video src="${video}" controls aria-label="Contrôles vidéo"></video>`
						: `<img src="${src}" alt="${title}"/>`
				}
                <figcaption>${title}</figcaption>
            </figure>
        </li>
    `;
};
