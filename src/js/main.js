import "../css/style.css";

async function main() {
	const link = document.querySelector("#home-page-link");

	if (link) {
		link.href = import.meta.env.BASE_URL;
	}
}

main();
