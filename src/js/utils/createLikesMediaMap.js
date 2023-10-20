"use strict";

/**
 * Creates a map of media items with like information.
 * @param {Array<import('../types.js').IMedia>} media
 * @returns {import('../types.js').IMediaMap}
 */
export function createLikesMediaMap(media) {
	return Object.fromEntries(
		media.map(({ id, likes }) => [
			id,
			{
				likes,
				hasLiked: false,
			},
		])
	);
}
