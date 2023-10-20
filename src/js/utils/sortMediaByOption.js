"use strict";

/**
 * Sort media on the selected sorting option.
 * @param {Array<import('../types.js').IMedia>} media
 * @param {string} sortSelect
 * @throws {Error}
 */
export function sortMediaByOption(media, sortSelect) {
	switch (sortSelect) {
		case "date":
			media.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			);
			break;
		case "popularity":
			media.sort((a, b) => b.likes - a.likes);
			break;
		case "title":
			media.sort((a, b) => a.title.localeCompare(b.title));
			break;
		default:
			throw new Error(`Unsupported sorting option: ${sortSelect}`);
	}
}
