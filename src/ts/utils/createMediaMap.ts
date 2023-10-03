import { IMedia, IMediaMap } from "../interfaces";

export function createMediaMap(media: IMedia[]): IMediaMap {
	return Object.fromEntries(
		media.map(({ id, ...props }) => [
			id,
			{
				...props,
				hasLiked: false,
			},
		])
	);
}
