"use strict";

/**
 * Fetch photographer data from the JSON file.
 * @returns {Promise<import('../types.js').IFetchDataApi | Error>}
 * */
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
