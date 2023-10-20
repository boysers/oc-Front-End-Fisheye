"use strict";

import { createMediaCardFactory } from "../factories/mediaCardFactory";
import { lightboxTemplate } from "../templates/lightboxTemplate";
import { mediaCardLightboxTemplate } from "../templates/mediaCardLightboxTemplate";
import { handleOpenLightbox } from "../utils/handleOpenLightbox";
import { ModalComponent } from "./ModalComponent";

/**
 * @typedef {Object} LightboxModalOptions
 * @property {Array<import('../types.js').IMedia>} media
 * @property {HTMLElement} mediaSectionElement
 */

/**
 * Creates and manages a Lightbox Modal component.
 * @param {string} selector
 * @param {LightboxModalOptions} options
 * @returns {[HTMLElement, { updateLightbox: () => void, onMediaItemDisplay: (id: number) => void }]}
 */
export const LightboxModal = (
	selector,
	{ media, mediaSectionElement } = { media: [], mediaSectionElement: null }
) => {
	// Create Modal Component.
	const [lightboxModalElement, { onDisplayModal }] = ModalComponent(
		selector,
		{
			onKeydown(e) {
				const isKeyboardEvent = e instanceof KeyboardEvent;

				const isArrowLeftKey = isKeyboardEvent && e.key == "ArrowLeft";
				const isArrowRightKey =
					isKeyboardEvent && e.key == "ArrowRight";

				const isEnterKey = isKeyboardEvent && e.key === "Enter";
				const isSpaceKey = isKeyboardEvent && e.key === " ";

				if (lightboxModalElement.classList.contains("open")) {
					if (isArrowLeftKey || isArrowRightKey) {
						e.preventDefault();
						isArrowLeftKey && showPreviousMediaItem();
						isArrowRightKey && showNextMediaItem();
					}
					return;
				}

				if (isEnterKey || isSpaceKey) {
					handleOpenLightbox(e, { onMediaItemDisplay, media });
					e.preventDefault();
				}
			},
			onClose() {
				const currentMediaItemElement =
					mediaSectionElement.querySelector(
						`[data-id="${currentMediaId}"]`
					);

				if (currentMediaItemElement) {
					currentMediaItemElement.querySelector("img")?.focus();
				}
			},
		}
	);
	lightboxModalElement.innerHTML += lightboxTemplate();

	const lightboxElement = lightboxModalElement.children[0];

	const lightboxBody = createLightboxBody();

	lightboxElement.insertAdjacentElement("beforeend", lightboxBody);

	let mediaItemElements;
	let currentMediaIndex = null;
	let currentMediaId = null;
	const mediaItemsCount = media.length;

	// Function to update the lightbox with media items.
	function updateLightbox() {
		const mediaCardLightbox = media.map((props) =>
			mediaCardLightboxTemplate(createMediaCardFactory(props))
		);

		lightboxBody.innerHTML = mediaCardLightbox.join("");

		mediaItemElements = lightboxBody.querySelectorAll("li");
	}

	// Function to create the lightbox body element.
	function createLightboxBody() {
		const lightboxBody = document.createElement("ul");

		lightboxBody.id = "lightbox-body";
		lightboxBody.role = "group";
		lightboxBody.setAttribute("aria-label", "Lightbox galerie d'images");
		lightboxBody.setAttribute("aria-live", "polite");
		lightboxBody.tabIndex = 0;

		return lightboxBody;
	}

	// Callback for displaying a specific media item in the lightbox.
	const onMediaItemDisplay = (id) => {
		mediaItemElements.forEach((mediaItem, idx) => {
			if (mediaItem.getAttribute("data-id") == id.toString()) {
				mediaItem.classList.add("open");
				mediaItem.setAttribute("aria-hidden", "false");
				onDisplayModal();
				currentMediaIndex = idx;
				currentMediaId = id;
				return;
			}
			mediaItem.classList.remove("open");
			mediaItem.setAttribute("aria-hidden", "true");
		});
	};

	// Function to show the previous media item in the lightbox.
	const showPreviousMediaItem = () => {
		mediaItemElements.forEach((el) => {
			el.classList.remove("open");
			el.setAttribute("aria-hidden", "true");
		});

		if (currentMediaIndex == 0) {
			currentMediaIndex = mediaItemsCount;
		}

		currentMediaIndex--;

		mediaItemElements[currentMediaIndex].classList.add("open");
		mediaItemElements[currentMediaIndex].setAttribute(
			"aria-hidden",
			"false"
		);
	};

	// Function to show the next media item in the lightbox.
	const showNextMediaItem = () => {
		mediaItemElements.forEach((el) => {
			el.classList.remove("open");
			el.setAttribute("aria-hidden", "true");
		});

		currentMediaIndex++;

		if (currentMediaIndex == mediaItemsCount) {
			currentMediaIndex = 0;
		}

		mediaItemElements[currentMediaIndex].classList.add("open");
		mediaItemElements[currentMediaIndex].setAttribute(
			"aria-hidden",
			"false"
		);
	};

	// Initial update of the lightbox.
	updateLightbox();

	// Lightbox modal controle.
	const [leftArrow, rightArrow] =
		lightboxModalElement.querySelectorAll(".arrow");

	leftArrow.addEventListener("click", showPreviousMediaItem);
	rightArrow.addEventListener("click", showNextMediaItem);

	return [lightboxModalElement, { updateLightbox, onMediaItemDisplay }];
};
