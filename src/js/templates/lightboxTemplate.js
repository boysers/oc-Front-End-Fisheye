"use strict";

/** @returns {import('../types.js').HTMLTemplate} */
export const lightboxTemplate = () => {
	return `
        <div>
            <div role="group" aria-label="carrousel controls" class="lightbox-controle">
                <img
                    src="icons/close-lightbox.svg"
                    alt="Close dialog"
                    data-js="close-modal"
                    tabindex="0"
                    role="button"
                    aria-label="Fermer la fenêtre modale"
                />
                <img
                    src="icons/expand_more-left.svg"
                    alt="Previous image"
                    tabindex="0"
                    role="button"
                    class="arrow left"
                    aria-label="Image précédente"
                />
                <img
                    src="icons/expand_more-right.svg"
                    alt="Next image"
                    tabindex="0"
                    role="button"
                    class="arrow right"
                    aria-label="Image suivante"
                />
            </div>
        </div>
    `;
};
