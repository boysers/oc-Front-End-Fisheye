import { createMediaCardFactory } from "../factories/mediaCardFactory";
import { IMedia, IMediaMap } from "../interfaces";
import { mediaCardTemplate } from "../templates/mediaCardTemplate";

type MediaSectionProps = {
	media: IMedia[];
	likedMediaMap: IMediaMap;
	onClick?: (e: Event) => void;
	onKeydown?: (e: KeyboardEvent) => void;
};

export const MediaSection = (
	selector: string,
	{ media, likedMediaMap, onClick, onKeydown }: MediaSectionProps = {
		media: [],
		likedMediaMap: {},
	}
) => {
	const mediaSectionElement = document.querySelector<HTMLElement>(selector);

	const updateMediaSection = () => {
		const mediaTemplates = media.map((mediaItem) => {
			return mediaCardTemplate(
				createMediaCardFactory({
					...mediaItem,
					likes: likedMediaMap[mediaItem.id].likes,
				} as IMedia)
			);
		});

		mediaSectionElement.innerHTML = mediaTemplates.join("");
	};

	updateMediaSection();

	const handleLikesButton = (e: KeyboardEvent) => {
		const isEnterSpaceKey = e.key == "Enter" || e.key == " ";

		if (!(e.target instanceof HTMLElement)) return;

		const isLikesButton = e.target.classList.contains("fa-heart");

		if (isEnterSpaceKey && isLikesButton) {
			e.target.click();
		}

		if (onKeydown instanceof Function) {
			onKeydown(e);
		}
	};

	if (onClick instanceof Function) {
		mediaSectionElement.addEventListener("click", (e) => {
			onClick(e);
		});
	}

	mediaSectionElement.addEventListener("keydown", handleLikesButton);

	return [mediaSectionElement, { updateMediaSection }] as const;
};
