"use strict";

/**
 * Extracts the photographer ID from the URL parameters.
 * @returns {number} - Photographer ID
 */
export function getPhotographerIdFromURL() {
	const idParam = new URL(location.href).searchParams.get("id");
	return parseInt(idParam, 10);
}
