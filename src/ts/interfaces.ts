export interface IFetchDataApi {
	photographers: IPhotographer[];
	media: IMedia[];
}

export interface IPhotographer {
	name: string;
	id: number;
	city: string;
	country: string;
	tagline: string;
	price: number;
	portrait: string;
}

export interface IMediaBase {
	id: number;
	photographerId: number;
	title: string;
	likes: number;
	date: string;
	price: number;
}

export interface IPhotoMedia extends IMediaBase {
	image: string;
}

export interface IVideoMedia extends IMediaBase {
	video: string;
}

export type IMedia = IPhotoMedia | IVideoMedia;

export type IPhotographProfile = IPhotographer & { media: IMedia[] };

export type IMediaMap = Record<
	string,
	{
		likes: number;
		hasLiked: boolean;
	}
>;
