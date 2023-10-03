export function setupMediaEventListeners(
	mediaSection: HTMLElement,
	onClick: (e: Event) => void
) {
	mediaSection.addEventListener("click", (e) => {
		if (onClick instanceof Function) {
			onClick(e);
		}
	});
}
