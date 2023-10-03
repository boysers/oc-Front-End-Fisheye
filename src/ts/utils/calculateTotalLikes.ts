import { IMedia } from "../interfaces";

export function calculateTotalLikes(media: IMedia[]) {
	return media.reduce((acc, mediaItem) => acc + mediaItem.likes, 0);
}
