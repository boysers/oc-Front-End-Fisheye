/**
 * @param {IMedia[]} media - Le tableau de médias.
 * @returns {IMediaMap} La carte des likes pour les médias.
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
