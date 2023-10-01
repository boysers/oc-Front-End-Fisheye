import { IFetchDataApi, IMedia, IPhotographer } from "../interfaces";

type IProfile = IPhotographer & { media: IMedia[] };

export function searchPhotographerProfile(
	data: IFetchDataApi,
	id: number
): IProfile | Error {
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
