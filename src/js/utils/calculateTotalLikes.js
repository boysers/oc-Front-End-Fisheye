/**
 * @param {IMedia[]} media
 * @returns {number}
 */
export function calculateTotalLikes(media) {
	return media.reduce((acc, mediaItem) => acc + mediaItem.likes, 0);
}
