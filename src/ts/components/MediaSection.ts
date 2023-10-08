import { IMedia, IMediaMap, IPhotoMedia, IVideoMedia } from "../interfaces";
import { mediaCardTemplate } from "../templates/mediaCardTemplate";

type MediaSectionFactoryProps = {
	id: number;
	title: string;
	likes: number;
	src: string;
};

type MediaSectionProps = {
	media: IMedia[];
	likedMediaMap: IMediaMap;
	onClick?: (e: Event) => void;
};

export const MediaSection = (
	selector: string,
	{ media, likedMediaMap, onClick }: MediaSectionProps = {
		media: [],
		likedMediaMap: {},
	}
) => {
	const mediaSectionElement = document.querySelector<HTMLElement>(selector);

	const updateMediaSection = () => {
		const mediaTemplates = media.map((mediaItem) => {
			return mediaCardTemplate(
				createMediaSectionFactoryProps({
					...mediaItem,
					likes: likedMediaMap[mediaItem.id].likes,
				} as IMedia)
			);
		});

		mediaSectionElement.innerHTML = mediaTemplates.join("");
	};
	updateMediaSection();

	if (onClick instanceof Function) {
		mediaSectionElement.addEventListener("click", (e) => {
			onClick(e);
		});
	}

	return [mediaSectionElement, { updateMediaSection }] as const;
};

function createMediaSectionFactoryProps(media: IMedia) {
	if ("video" in media) {
		return createVideoMediaFactoryProps(media);
	}
	return createPhotoMediaFactoryProps(media);
}

function createPhotoMediaFactoryProps({
	image,
	photographerId,
	id,
	likes,
	title,
}: IPhotoMedia): MediaSectionFactoryProps {
	return {
		title,
		src: `media/${photographerId}/${image}`,
		likes,
		id,
	};
}

function createVideoMediaFactoryProps({
	video,
	photographerId,
	id,
	likes,
	title,
}: IVideoMedia) {
	return {
		title,
		src: `media/${photographerId}/${video}_poster.png`,
		likes,
		id,
		video: `media/${photographerId}/${video}`,
	};
}
