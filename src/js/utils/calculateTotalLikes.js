"use strict";

/**
 * Calculate the total number of likes for a array of media.
 * @param {Array<import('../types.js').IMedia>} media
 * @returns {number}
 */
export function calculateTotalLikes(media) {
	return media.reduce((acc, mediaItem) => acc + mediaItem.likes, 0);
}
