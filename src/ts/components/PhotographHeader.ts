import { IPhotographer } from "../interfaces";
import { photographHeaderTemplate } from "../templates/photographHeaderTemplate";

type PhotographHeaderProps = { photograph: IPhotographer; likes?: number };

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

	const likesElement = photographHeaderElement.querySelector(
		".photographer-info > :nth-child(1) > span"
	);
	const onIncrementLikes = () => {
		if (likesElement instanceof HTMLElement) {
			likesElement.innerText = (likes = likes + 1).toString();
		}
	};
	const onDecrementLikes = () => {
		if (likesElement instanceof HTMLElement) {
			likesElement.innerText = (likes = likes - 1).toString();
		}
	};

	const contactMeBtn = photographHeaderElement.querySelector<HTMLElement>(
		"[data-js='open-modal'"
	);

	return [
		photographHeaderElement,
		{ onIncrementLikes, onDecrementLikes, contactMeBtn },
	] as const;
};
