import { IPhotographer } from "../interfaces";
import { cardTemplate } from "../templates/cardTemplate";

type PhotographerSectionProps = { photographers: IPhotographer[] };

export const PhotographerSection = (
	selector: string,
	{ photographers }: PhotographerSectionProps
) => {
	const photographerSections = document.querySelector(selector);

	const photographerTemplates = photographers.map(
		({ city, country, id, name, portrait, price, tagline }) =>
			cardTemplate({
				title: name,
				href: `photographer.html?id=${id}`,
				src: `photographers/${portrait}`,
				location: `${city}, ${country}`,
				tjm: `${price}€/jour`,
				tagline,
			})
	);

	photographerSections.innerHTML = photographerTemplates.join("");

	return [photographerSections] as const;
};
