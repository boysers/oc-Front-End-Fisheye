import { IMedia, IPhotoMedia, IVideoMedia } from "../interfaces";
import { mediaCardTemplate } from "../templates/mediaCardTemplate";

type MediaSectionFactoryProps = {
	id: number;
	title: string;
	likes: number;
	src: string;
};

type MediaSectionProps = {
	media: IMedia[];
};

export const MediaSection = (
	selector: string,
	{ media }: MediaSectionProps
) => {
	const mediaSectionElement = document.querySelector<HTMLElement>(selector);

	const mediaTemplates = media.map((mediaItem) => {
		return mediaCardTemplate(
			createMediaSectionFactoryProps(mediaItem as IMedia)
		);
	});
	mediaSectionElement.innerHTML = mediaTemplates.join("");

	return [mediaSectionElement] as const;
};

function createMediaSectionFactoryProps(
	media: IMedia
): MediaSectionFactoryProps {
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
}: IVideoMedia): MediaSectionFactoryProps {
	return {
		title,
		src: `media/${photographerId}/${video}_poster.png`,
		likes,
		id,
	};
}
