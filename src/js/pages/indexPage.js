"use strict";

import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { PhotographerSection } from "../components/PhotographerSection";

async function indexPage() {
	// To be replaced by the API REST
	const data = await fetchPhotographersJSON();

	if (data instanceof Error) {
		console.error("Error fetching photographers data:", data.message);
		return;
	}

	const { photographers } = data;

	// Create PhotographerSection component.
	PhotographerSection(".photographer_section", { photographers });
}

indexPage();
