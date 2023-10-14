import { IMedia, IPhotoMedia, IVideoMedia } from "../interfaces";

type MediaSectionFactoryProps = {
	id: number;
	title: string;
	likes: number;
	src: string;
};

export function createMediaCardFactory(media: IMedia) {
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
