"use strict";

/**
 * @typedef {Object} MediaSectionFactoryProps
 * @property {number} id
 * @property {string} title
 * @property {number} likes
 * @property {string} src
 * @property {string | undefined} video
 */

/**
 * Creates factory properties for a media card on the type media item.
 * @param {import('../types.js').IMedia} media
 * @returns {MediaSectionFactoryProps}
 */
export function createMediaCardFactory(media) {
	if ("video" in media) {
		return createVideoMediaFactoryProps(media);
	}
	return createPhotoMediaFactoryProps(media);
}

/**
 * Creates factory properties for a photo media item.
 * @param {import('../types.js').IPhotoMedia} param0
 * @returns {Omit<'video', MediaSectionFactoryProps>}
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
 * Creates factory properties for a video media item.
 * @param {import("../types.js").IVideoMedia} param0
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
