interface CallbackLikes {
	onIncrementLikes: () => void;
	onDecrementLikes: () => void;
}

export function setupMediaLikesEventListeners(
	mediaSection: HTMLElement,
	likesMap: Record<
		string,
		{
			likes: number;
			hasLiked: boolean;
		}
	>,
	{ onIncrementLikes, onDecrementLikes }: CallbackLikes
) {
	mediaSection.querySelectorAll("article").forEach((mediaItem) =>
		mediaItem.addEventListener("click", (e) => {
			const isHTMLElement = e.target instanceof HTMLElement;
			if (!isHTMLElement) return;

			const isHeart =
				(e.target.parentNode as HTMLElement).getAttribute(
					"aria-label"
				) === "likes";
			if (!isHeart) return;

			const id = mediaItem.getAttribute("data-id");
			if (!id) return;

			const likesElement =
				mediaItem.querySelector<HTMLElement>("p > span");

			if (likesMap[id].hasLiked) {
				likesMap[id].hasLiked = false;
				likesMap[id].likes -= 1;
				updateLikesElement(likesElement, likesMap[id].likes);
				callLikesCallback(onDecrementLikes);
				return;
			}

			likesMap[id].hasLiked = true;
			likesMap[id].likes += 1;
			updateLikesElement(likesElement, likesMap[id].likes);
			callLikesCallback(onIncrementLikes);
		})
	);
}

function callLikesCallback(callback: () => void) {
	if (callback instanceof Function) {
		callback();
	}
}

function updateLikesElement(element: HTMLElement, likes: number) {
	if (element) {
		element.innerText = likes.toString();
	}
}
