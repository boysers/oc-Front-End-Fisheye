import { FisheyeAPI } from "./FisheyeAPI";
import { PhotographersController } from "./PhotographersController";
import { PhotographersService } from "./PhotographersService";
import { PhotographersView } from "./PhotographersView";

function indexPage() {
	const fisheyeAPI = new FisheyeAPI();

	const photographersService = new PhotographersService(fisheyeAPI);
	const photographersView = new PhotographersView(".photographer_section");
	const photographersController = new PhotographersController(
		photographersService,
		photographersView
	);

	photographersController.init();
}

indexPage();
