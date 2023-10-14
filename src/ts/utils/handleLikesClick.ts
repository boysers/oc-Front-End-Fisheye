import { IMediaMap } from "../interfaces";

interface CallbackLikes {
	onIncrementLikes: () => void;
	onDecrementLikes: () => void;
}

type handleLikesProps = CallbackLikes & {
	likedMediaMap: IMediaMap;
};

export const handleLikesClick = (
	e: Event,
	{ onIncrementLikes, onDecrementLikes, likedMediaMap }: handleLikesProps
) => {
	if (!(e.target instanceof HTMLElement)) return;
	const element = e.target;

	const likesBtn = findLikesBtn(element);
	if (!likesBtn) return;

	const mediaItem = findMediaItem(element);
	if (!mediaItem) return;

	const id = mediaItem.getAttribute("data-id");
	if (!id) return;

	const likesElement = likesBtn.previousElementSibling as HTMLElement;

	likesBtn.setAttribute("aria-live", "polite");
	likesBtn.setAttribute("aria-atomic", "true");

	if (likedMediaMap[id].hasLiked) {
		likedMediaMap[id].hasLiked = false;
		likedMediaMap[id].likes -= 1;
		updateLikesBtn(likesElement, likedMediaMap[id].likes);
		callLikesCallback(onDecrementLikes);
		return;
	}
	likedMediaMap[id].hasLiked = true;
	likedMediaMap[id].likes += 1;
	updateLikesBtn(likesElement, likedMediaMap[id].likes);

	callLikesCallback(onIncrementLikes);
};

function findLikesBtn(element: HTMLElement): HTMLElement | null {
	const isLikesBtn = element.classList.contains("fa-heart");
	if (!isLikesBtn) return null;
	return element;
}

function findMediaItem(element: HTMLElement) {
	let currentElement: HTMLElement | null = element;
	while (currentElement && !currentElement.classList.contains("media-item")) {
		currentElement = currentElement.parentElement;
	}
	return currentElement;
}

function updateLikesBtn(element: HTMLElement, likes: number) {
	if (element) {
		element.innerText = likes.toString();
	}
}

function callLikesCallback(callback: () => void) {
	if (callback instanceof Function) {
		callback();
	}
}
