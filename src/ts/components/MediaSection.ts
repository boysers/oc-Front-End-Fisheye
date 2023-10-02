import { IMedia, IPhotoMedia, IVideoMedia } from "../interfaces";
import { mediaCardTemplate } from "../templates/mediaCardTemplate";

type MediaSectionProps = {
	media: IMedia[];
};

type MediaSectionFactoryProps = {
	id: number;
	title: string;
	likes: number;
	src: string;
};

const createLikesMap = (media: IMedia[]) =>
	Object.fromEntries(
		media.map(({ id, likes }) => [
			id,
			{
				likes,
				hasLiked: false,
			},
		])
	);

export const MediaSection = (
	selector: string,
	{ media }: MediaSectionProps
) => {
	const mediaSection = document.querySelector<HTMLElement>(selector);

	const mediaTemplates = media.map((mediaItem) =>
		mediaCardTemplate(createMediaSectionFactoryProps(mediaItem))
	);
	mediaSection.innerHTML = mediaTemplates.join("");

	const likesMap = createLikesMap(media);

	return [mediaSection, { likesMap }] as const;
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
