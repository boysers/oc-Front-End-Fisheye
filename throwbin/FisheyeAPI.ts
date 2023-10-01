import { IPhotographerAPI } from "./PhotographerAPI";
// eslint-disable-next-line no-unused-vars
import { PhotographerModel } from "./PhotographerModel";
import { FetchAPIException } from "../utils/FetchAPIException";

export class FisheyeAPI extends IPhotographerAPI {
	/** @returns {Promise<{photographers: PhotographerModel[]}>} */
	async fetchPhotographers() {
		const res = await fetch(`data/photographers.json`);
		if (!res.ok) throw new FetchAPIException(res.status, res.statusText);
		return await res.json();
	}

	async fetchMedia() {
		const res = await fetch(`data/media.json`);
		if (!res.ok) throw res;
		return await res.json();
	}
}
