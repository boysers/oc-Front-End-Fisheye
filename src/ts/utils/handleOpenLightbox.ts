import { IMedia } from "../interfaces";

type Props = {
	toggleModalDisplay: (nameId: string) => void;
	onMediaItemDisplay: (id: number) => void;
	media: IMedia[];
};

export function handleOpenLightbox(
	e: Event,
	{ toggleModalDisplay, onMediaItemDisplay, media }: Props
) {
	if (e.target instanceof HTMLImageElement) {
		let currentElement: HTMLElement | null = e.target;
		while (
			currentElement &&
			!currentElement.classList.contains("media-item")
		) {
			currentElement = currentElement.parentElement;
		}
		const mediaItem = media.find(
			(item) =>
				item.id == parseInt(currentElement.getAttribute("data-id"), 10)
		);
		toggleModalDisplay("lightbox-modal");
		onMediaItemDisplay(mediaItem.id);
	}
}
