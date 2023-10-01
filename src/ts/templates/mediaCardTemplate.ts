type MediaCardProps = { title: string; src: string; likes: number; id: number };

export const mediaCardTemplate = ({
	title,
	src,
	likes,
	id,
}: MediaCardProps) => {
	return `
        <article>
            <img src="${src}" alt="${title}" tabindex="0" data-id="${id}"/>
            <div>
                <h2>${title}</h2>
                <p>${likes}<i aria-label="likes" class="fa-solid fa-heart" style="color: #901c1c"></i></p>
            </div>
        </article>
    `;
};
