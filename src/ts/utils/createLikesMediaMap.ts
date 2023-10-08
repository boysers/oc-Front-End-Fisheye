import { IMedia, IMediaMap } from "../interfaces";

export function createLikesMediaMap(media: IMedia[]): IMediaMap {
	return Object.fromEntries(
		media.map(({ id, likes }) => [
			id,
			{
				likes,
				hasLiked: false,
			},
		])
	);
}
