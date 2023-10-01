import { IPhotographer } from "../interfaces";
import { photographHeaderTemplate } from "../templates/photographHeaderTemplate";

type PhotographHeaderProps = { photograph: IPhotographer, likes?: number };

export const PhotographHeader = (
	selector: string,
	{ photograph, likes = 0 }: PhotographHeaderProps
) => {
	const photographHeaderElement = document.querySelector(selector);

	const { name, city, portrait, tagline, country, price } = photograph;

	photographHeaderElement.innerHTML = photographHeaderTemplate({
		title: name,
		src: `photographers/${portrait}`,
		location: `${city}, ${country}`,
		tagline,
		likes,
		tjm: `${price}€/jour`,
	});

	return [photographHeaderElement] as const;
};
