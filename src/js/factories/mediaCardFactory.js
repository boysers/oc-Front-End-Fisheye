/**
 * @typedef {Object} MediaSectionFactoryProps
 * @property {number} id
 * @property {string} title
 * @property {number} likes
 * @property {string} src
 * @property {string} [video]
 */

/**
 * @param {IMedia} media
 * @returns {MediaSectionFactoryProps}
 */
export function createMediaCardFactory(media) {
	if ("video" in media) {
		return createVideoMediaFactoryProps(media);
	}
	return createPhotoMediaFactoryProps(media);
}

/**
 * @param {IPhotoMedia} param0
 * @returns {MediaSectionFactoryProps}
 */
function createPhotoMediaFactoryProps({
	image,
	photographerId,
	id,
	likes,
	title,
}) {
	return {
		title,
		src: `media/${photographerId}/${image}`,
		likes,
		id,
	};
}

/**
 * @param {IVideoMedia} param0
 * @returns {MediaSectionFactoryProps}
 */
function createVideoMediaFactoryProps({
	video,
	photographerId,
	id,
	likes,
	title,
}) {
	return {
		title,
		src: `media/${photographerId}/${video}_poster.png`,
		likes,
		id,
		video: `media/${photographerId}/${video}`,
	};
}
