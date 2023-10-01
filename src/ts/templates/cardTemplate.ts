type CardProps = {
	title: string;
	href: string;
	src: string;
	location: string;
	tjm: string;
	tagline: string;
};

export const cardTemplate = ({
	href,
	location,
	src,
	title,
	tjm,
	tagline,
}: CardProps): string => {
	return `
		<article>
			<a href="${href}" aria-label="${title}">
				<img src="${src}" alt="${title}" />
				<h2>${title}</h2>
			</a>
			<p>${location}</p>
			<p>${tagline}</p>
			<p>${tjm}</p>
		</article>
	`;
};
