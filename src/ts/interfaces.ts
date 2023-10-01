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

export interface IMedia {
	id: number;
	photographerId: number;
	title: string;
	image: string;
	likes: number;
	date: string;
	price: number;
}
