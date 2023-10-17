/**
 * @param {IFetchDataApi} data
 * @param {number} id
 * @returns {IPhotographProfile | Error}
 */
export function searchPhotographProfile(data, id) {
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
