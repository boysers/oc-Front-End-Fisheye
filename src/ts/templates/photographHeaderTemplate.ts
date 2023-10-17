type CardProps = {
	title: string;
	location: string;
	tagline: string;
	src: string;
	likes: number;
	tjm: string;
};

export const photographHeaderTemplate = ({
	location,
	src,
	tagline,
	title,
	likes,
	tjm,
}: CardProps) => {
	return `
        <div>
            <h1>${title}</h1>
            <p>${location}</p>
            <p>${tagline}</p>
        </div>
        <img src="${src}" alt="${title}">
        <button data-js="open-modal" class="contact_button" aria-label="Contact Me" type="button">Contactez-moi</button>
        <div class="photographer-info">
            <p aria-label="Nombre de likes"><span>${likes}</span><i aria-label="likes" role="img" class="fa-solid fa-heart" style="color: #000000;"></i></p>
            <p aria-label="Tarif journalier moyen">${tjm}</p>
        </div>
    `;
};