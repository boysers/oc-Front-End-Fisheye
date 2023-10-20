"use strict";

/** @returns {import('../types.js').HTMLTemplate} */
export const lightboxTemplate = () => {
	return `
        <div>
            <div role="group" aria-label="carrousel controls" class="lightbox-controle">
                <img
                    src="icons/close-lightbox.svg"
                    alt=""
                    data-js="close-modal"
                    tabindex="0"
                    role="button"
                    aria-label="Close dialog"
                />
                <img
                    src="icons/expand_more-left.svg"
                    alt=""
                    tabindex="0"
                    role="link"
                    class="arrow left"
                    aria-label="Previous Image"
                />
                <img
                    src="icons/expand_more-right.svg"
                    alt=""
                    tabindex="0"
                    role="link"
                    class="arrow right"
                    aria-label="Next image"
                />
            </div>
        </div>
    `;
};
