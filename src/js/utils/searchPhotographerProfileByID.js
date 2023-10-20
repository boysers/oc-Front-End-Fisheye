"use strict";

/**
 * Findes a photographer's profile in the data with its ID.
 * @param {IFetchDataApi} data - data api (media)
 * @param {number} id - Photographer ID
 * @returns {import('../types.js').IPhotographProfile | Error}
 */
export function searchPhotographProfileByID(data, id) {
	const { photographers, media } = data;

	const photographerProfile = photographers.find(
		(photographer) => photographer.id === id
	);

	if (!photographerProfile) {
		return new Error("Profile not found");
	}

	const photographerMedia = media.filter(
		(mediaItem) => mediaItem.photographerId === photographerProfile.id
	);

	const profile = {
		...photographerProfile,
		media: photographerMedia,
	};

	return profile;
}
