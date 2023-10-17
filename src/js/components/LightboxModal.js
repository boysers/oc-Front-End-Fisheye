import { createMediaCardFactory } from "../factories/mediaCardFactory";
import { lightboxTemplate } from "../templates/lightboxTemplate";
import { mediaCardLightboxTemplate } from "../templates/mediaCardLightboxTemplate";
import { handleOpenLightbox } from "../utils/handleOpenLightbox";
import { ModalComponent } from "./ModalComponent";

/**
 * @typedef {Object} LightboxModalProps
 * @property {IMedia[]} media
 * @property {HTMLElement} mediaSectionElement
 */

/**
 * @param {string} selector
 * @param {LightboxModalProps} options
 * @returns {[HTMLElement, { updateLightbox: () => void, onMediaItemDisplay: (id: number) => void }]}
 */
export const LightboxModal = (
	selector,
	{ media, mediaSectionElement } = { media: [], mediaSectionElement: null }
) => {
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
				const currentMediaItemElement = mediaSectionElement
					? mediaSectionElement.querySelector(`[data-id="${currentMediaId}"]`)
					: null;
				if (
					currentMediaItemElement &&
					currentMediaItemElement.querySelector <
						HTMLImageElement >
						"img"
				) {
					currentMediaItemElement.querySelector <
						HTMLImageElement >
						"img".focus();
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

	updateLightbox();

	function updateLightbox() {
		const mediaCardLightbox = media.map((props) =>
			mediaCardLightboxTemplate(createMediaCardFactory(props))
		);

		lightboxBody.innerHTML = mediaCardLightbox.join("");

		lightboxElement;

		mediaItemElements = lightboxBody.querySelectorAll("li");
	}

	function createLightboxBody() {
		const lightboxBody = document.createElement("ul");

		lightboxBody.id = "lightbox-body";
		lightboxBody.role = "group";
		lightboxBody.setAttribute("aria-label", "Lightbox galerie d'images");
		lightboxBody.setAttribute("aria-live", "polite");
		lightboxBody.tabIndex = 0;

		return lightboxBody;
	}

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

	const [leftArrow, rightArrow] =
		lightboxModalElement.querySelectorAll(".arrow");

	leftArrow.addEventListener("click", showPreviousMediaItem);
	rightArrow.addEventListener("click", showNextMediaItem);

	return [lightboxModalElement, { updateLightbox, onMediaItemDisplay }];
};
