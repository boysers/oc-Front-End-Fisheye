import { IPhotographer } from "../interfaces";

type CardProps = IPhotographer;

export const cardTemplate = ({
	city,
	country,
	id,
	name,
	portrait,
	price,
	tagline,
}: CardProps): string => {
	const linkHref = `photographer.html?id=${id}`;
	const imgHref = `photographers/${portrait}`;
	const location = `${city}, ${country}`;
	const tjm = `${price}€/jour`;
	return `
		<article>
			<a href="${linkHref}" aria-label="${name}">
				<img src="${imgHref}" alt="${name}" />
				<h2>${name}</h2>
			</a>
			<p>${location}</p>
			<p>${tagline}</p>
			<p>${tjm}</p>
		</article>
	`;
};
