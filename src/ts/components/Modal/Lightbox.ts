import { lightboxTemplate } from "../../templates/lightboxTemplate";

type LightboxProps = {
	mediaSectionElement: HTMLElement;
};

export const Lightbox = (
	selector: string,
	{ mediaSectionElement }: LightboxProps
) => {
	const lightboxElement = document.querySelector(selector);

	lightboxElement.innerHTML += lightboxTemplate();
	// modalElement.innerHTML += lightboxTemplate();

	const lightboxModalElement = lightboxElement;

	let cloneMediaSectionElement = createClone();

	lightboxModalElement.innerHTML += cloneMediaSectionElement.outerHTML;

	let mediaItemElements = lightboxModalElement.querySelectorAll("article");
	let currentMediaIndex: number = null;
	const mediaItemsCount = mediaItemElements.length;

	function createClone() {
		const clonedElement = mediaSectionElement.cloneNode(
			true
		) as HTMLElement;
		clonedElement.id = "lightbox-body";
		return clonedElement;
	}

	function updateLightbox() {
		cloneMediaSectionElement = createClone();
		lightboxModalElement
			.querySelector("#lightbox-body")
			.replaceWith(cloneMediaSectionElement);

		mediaItemElements = lightboxModalElement.querySelectorAll("article");
	}

	const onMediaItemDisplay = (id: number) => {
		mediaItemElements.forEach((mediaItem, idx) => {
			if (mediaItem.getAttribute("data-id") == id.toString()) {
				mediaItem.classList.add("open");
				currentMediaIndex = idx;
				return;
			}
			mediaItem.classList.remove("open");
		});
	};

	const showPreviousMediaItem = () => {
		mediaItemElements.forEach((el) => {
			el.classList.remove("open");
		});
		if (currentMediaIndex == 0) {
			currentMediaIndex = mediaItemsCount;
		}
		currentMediaIndex--;
		mediaItemElements[currentMediaIndex].classList.add("open");
	};

	const showNextMediaItem = () => {
		mediaItemElements.forEach((el) => {
			el.classList.remove("open");
		});
		currentMediaIndex++;
		if (currentMediaIndex == mediaItemsCount) {
			currentMediaIndex = 0;
		}
		mediaItemElements[currentMediaIndex].classList.add("open");
	};

	const [leftArrow, rightArrow] =
		lightboxModalElement.querySelectorAll(".arrow");

	leftArrow.addEventListener("click", () => {
		showPreviousMediaItem();
	});

	rightArrow.addEventListener("click", () => {
		showNextMediaItem();
	});

	return [
		lightboxModalElement,
		{ onMediaItemDisplay, updateLightbox },
	] as const;
};
