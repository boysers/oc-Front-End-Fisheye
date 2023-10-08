export const lightboxTemplate = () => {
	return `
        <img
            src="icons/close-lightbox.svg"
            alt="Close dialog"
            data-js="close-modal"
            tabindex="0"
            role="button"
        />
        <img
            src="icons/expand_more-left.svg"
            alt="Previous image"
            tabindex="0"
            role="button"
            class="arrow left"
        />
        <img
            src="icons/expand_more-right.svg"
            alt="Next image"
            tabindex="0"
            role="button"
            class="arrow right"
        />
    `;
};
