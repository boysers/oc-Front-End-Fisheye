import { IPhotographer } from "../interfaces";
import { cardTemplate } from "../templates/cardTemplate";

type PhotographerSectionProps = { photographers: IPhotographer[] };

export const PhotographerSection = (
	selector: string,
	{ photographers }: PhotographerSectionProps
) => {
	const photographerSections = document.querySelector(selector);

	const photographerTemplates = photographers.map((photographer) =>
		cardTemplate(photographer)
	);

	photographerSections.innerHTML = photographerTemplates.join("");

	return [photographerSections] as const;
};
