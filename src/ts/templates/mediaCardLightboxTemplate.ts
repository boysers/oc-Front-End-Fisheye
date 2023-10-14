type MediaCardProps = {
	title: string;
	src: string;
	likes: number;
	id: number;
	video?: string;
};

export const mediaCardLightboxTemplate = ({
	title,
	src,
	id,
	video,
}: MediaCardProps) => {
	return `
        <li data-id="${id}" class="media-item" aria-label="${title}">
            <figure>
                <img src="${src}" alt="${title}"/>
                ${video ? `<video src="${video}" controls aria-label="Contrôles vidéo"></video>` : ""}
                <figcaption>${title}</figcaption>
            </figure>
        </li>
    `;
};
