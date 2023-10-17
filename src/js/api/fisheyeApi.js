/**
 * @typedef {Object} IFetchDataApi
 * @property {IPhotographer[]} fetchPhotographersJSON
 * @property {IMedia[]} media
 */

/**  @returns {Promise<IFetchDataApi | Error>} */
export async function fetchPhotographersJSON() {
	try {
		const res = await fetch("data/photographers.json");

		if (!res.ok) {
			throw new Error(
				`Fisheye Api Error: ${JSON.stringify({
					status: res.status,
					statusText: res.statusText,
				})}`
			);
		}

		return await res.json();
	} catch (error) {
		console.error("An unexpected error occurred:", error);
		return new Error("An unexpected error occurred while fetching data.");
	}
}
