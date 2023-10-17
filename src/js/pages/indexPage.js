import { fetchPhotographersJSON } from "../api/fisheyeApi";
import { PhotographerSection } from "../components/PhotographerSection";

async function indexPage() {
	const data = await fetchPhotographersJSON();

	if (data instanceof Error) {
		console.error("Error fetching photographers data:", data.message);
		return;
	}

	const { photographers } = data;
	PhotographerSection(".photographer_section", { photographers });
}

indexPage();
