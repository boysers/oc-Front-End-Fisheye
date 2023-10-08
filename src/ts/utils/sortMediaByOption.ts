import { IMedia } from "../interfaces";

export function sortMediaByOption(media: IMedia[], sortSelect: string) {
	switch (sortSelect) {
		case "date":
			media.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			);
			break;
		case "popularity":
			media.sort((a, b) => b.likes - a.likes);
			break;
		case "title":
			media.sort((a, b) => a.title.localeCompare(b.title));
			break;
		default:
			throw new Error(`Unsupported sorting option: ${sortSelect}`);
	}
}
