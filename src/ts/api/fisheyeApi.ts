import { IFetchDataApi } from "../interfaces";

export async function fetchPhotographersJSON(): Promise<IFetchDataApi | Error> {
	try {
		const res = await fetch("data/photographers.json");
		if (!res.ok)
			throw new Error(
				`Fisheye Api Error:, ${JSON.stringify({
					status: res.status,
					statusText: res.statusText,
				})}`
			);
		return (await res.json()) as IFetchDataApi;
	} catch (error) {
		console.error("An unexpected error occurred:", error);
		return new Error("An unexpected error occurred while fetching data.");
	}
}
