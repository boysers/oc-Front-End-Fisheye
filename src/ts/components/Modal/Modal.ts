import "../../../css/modal.css";

export const Modal = (selector: string) => {
	const modalElement = document.querySelector<HTMLElement>(selector);
	const body = document.body;

	const toggleModalDisplay = (nameId = "") => {
		// Object.values(modalElement.children).forEach((el) => {
		// 	if (el.id == nameId) {
		// 		el.classList.add("open");
		// 		return;
		// 	}
		// 	el.classList.remove("open");
		// });
		modalElement.style.backgroundColor = null;
		if (modalElement.classList.contains("open")) {
			modalElement.classList.remove("open");
			body.classList.remove("open-modal");
			modalElement.ariaHidden = "true";
			Object.values(modalElement.children).forEach((el) => {
				el.classList.remove("open");
			});
			return;
		}
		Object.values(modalElement.children).forEach((el) => {
			if (el.id == nameId) {
				el.classList.add("open");
				return;
			}
		});
		body.classList.add("open-modal");
		modalElement.classList.add("open");
		modalElement.ariaHidden = "false";
	};

	const handleOpenModal = (e: Event) => {
		if (modalElement.classList.contains("open")) return;
		toggleModalDisplay();
		e.preventDefault();

		// if (isOnOpen) {
		// 	onOpen(e);
		// }
	};

	const handleCloseModal = (e: Event | KeyboardEvent) => {
		if (!modalElement.classList.contains("open")) return;

		const isKeyboardEvent = e instanceof KeyboardEvent;
		const isEvent = e instanceof Event;

		const isTargetElement = isEvent && e.target instanceof HTMLElement;

		const isEscapeKey = isKeyboardEvent && e.key == "Escape";
		const isModalElement = isTargetElement && e.target === modalElement;
		const isCloseModalBtn =
			isTargetElement &&
			e.target.getAttribute("data-js") == "close-modal";

		if (isEscapeKey || isModalElement || isCloseModalBtn) {
			toggleModalDisplay();
			// if (onClose instanceof Function) {
			// 	onClose(e);
			// }
		}
	};

	modalElement.addEventListener("mousedown", (e) => {
		handleOpenModal(e);
		handleCloseModal(e);
	});
	document.addEventListener("keydown", handleCloseModal);

	return [modalElement, { toggleModalDisplay }] as const;
};
