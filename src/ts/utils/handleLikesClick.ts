import { IMediaMap } from "../interfaces";

interface CallbackLikes {
	onIncrementLikes: () => void;
	onDecrementLikes: () => void;
}

type handleLikesProps = CallbackLikes & {
	mediaMap: IMediaMap;
};

export const handleLikesClick = (
	e: Event,
	{ onIncrementLikes, onDecrementLikes, mediaMap }: handleLikesProps
) => {
	if (!(e.target instanceof HTMLElement)) return;
	const element = e.target;

	const likesBtn = findLikesBtn(element);
	if (!likesBtn) return;

	const mediaItem = findMediaItem(element);
	if (!mediaItem) return;

	const id = mediaItem.getAttribute("data-id");
	if (!id) return;

	if (mediaMap[id].hasLiked) {
		mediaMap[id].hasLiked = false;
		mediaMap[id].likes -= 1;
		updateLikesBtn(likesBtn, mediaMap[id].likes);
		callLikesCallback(onDecrementLikes);
		return;
	}
	mediaMap[id].hasLiked = true;
	mediaMap[id].likes += 1;
	updateLikesBtn(likesBtn, mediaMap[id].likes);
	callLikesCallback(onIncrementLikes);
};

function findLikesBtn(element: HTMLElement): HTMLElement | null {
	const isLikesBtn = element.getAttribute("aria-label") === "likes";
	if (!isLikesBtn) return null;
	return element.querySelector<HTMLElement>("span") ?? null;
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
