type MediaCardProps = {
	title: string;
	src: string;
	likes: number;
	id: number;
	video?: string;
};

export const mediaCardTemplate = ({
	title,
	src,
	likes,
	id,
	video,
}: MediaCardProps) => {
	return `
        <article data-id="${id}" class="media-item">
            <img src="${src}" alt="${title}" tabindex="0"/>
            ${video ? `<video src="${video}" controls></video>` : ""}
            <div>
                <h2>${title}</h2>
                <p aria-label="likes" ><span>${likes}</span><i class="fa-solid fa-heart" style="color: #901c1c"></i></p>
            </div>
        </article>
    `;
};
