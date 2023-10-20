"use strict";

/**
 * @typedef {Object} MediaCardTemplateProps
 * @property {number} id
 * @property {string} title
 * @property {string} src
 * @property {number} likes
 * @property {boolean} hasLiked
 * @property {string | undefined} video
 */

/**
 * @param {MediaCardTemplateProps} props
 * @returns {import('../types.js').HTMLTemplate}
 */
export const mediaCardTemplate = ({
	title,
	src,
	likes,
	id,
	video,
	hasLiked,
}) => {
	const img = `<img src="${src}" alt="${title} image" tabindex="0" role="button"/>`;
	const type = hasLiked ? "solid" : "regular";

	return `
        <article data-id="${id}" class="media-item">
            
			${
				video
					? `
			<div class="video">
				${img}
				<i class="fa-solid fa-play" style="color: #ffffff;"></i>
			</div>`
					: img
			}
            <div>
                <h2>${title}</h2>
                <p class="likes-btn">
                    <span id="likes${id}" aria-live="polite" aria-atomic="true">${likes}</span>
                    <i aria-label="${likes} likes" tabindex="0" role="button" class="fa-${type} fa-heart" style="color: #901c1c"></i>
                </p>
            </div>
        </article>
    `;
};
