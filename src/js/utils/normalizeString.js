"use strict";

/**
 * Cleans and normalizes a string by removing unnecessary spaces.
 * @param {string} str
 * @returns {string}
 */
export function cleanAndNormalizeString(str) {
	const trimmedMessage = str.trim();

	return trimmedMessage.replace(/\s+/g, " ");
}
