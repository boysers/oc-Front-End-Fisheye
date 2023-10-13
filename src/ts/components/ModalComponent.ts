import "../../css/modal.css";

type ModalComponentProps = {
	onClose?: (e: Event | KeyboardEvent) => void;
	onOpen?: (e: Event) => void;
};

export const ModalComponent = (
	selector: string,
	{ onClose, onOpen }: ModalComponentProps = {}
) => {
	const modalElement = document.querySelector<HTMLElement>(selector);
	const body = document.body;
	const mainWrapper = body.children[0] as HTMLElement;

	const onDisplayModal = () => {
		if (modalElement.classList.contains("open")) {
			body.classList.remove("open-modal");
			modalElement.classList.remove("open");
			modalElement.setAttribute("aria-hidden", "true");
			mainWrapper.setAttribute("aria-hidden", "false");
			return;
		}
		body.classList.add("open-modal");
		modalElement.classList.add("open");
		modalElement.setAttribute("aria-hidden", "false");
		mainWrapper.setAttribute("aria-hidden", "true");
	};

	const onOpenModal = (e: Event) => {
		if (modalElement.classList.contains("open")) return;
		onDisplayModal();
		e.preventDefault();
		if (onOpen instanceof Function) {
			onOpen(e);
		}
	};

	const onCloseModal = (e: Event | KeyboardEvent) => {
		if (!modalElement.classList.contains("open")) return;

		const isKeyboardEvent = e instanceof KeyboardEvent;
		const isEvent = e instanceof Event;

		const isTargetElement = isEvent && e.target instanceof HTMLElement;
		const isEscapeKey = isKeyboardEvent && e.key == "Escape";
		const isModalElement = isTargetElement && e.target === modalElement;

		const isTabSpaceKey =
			isKeyboardEvent && e.key != " " && e.key != "Enter";
		const isCloseModalBtn =
			isTargetElement &&
			e.target.getAttribute("data-js") == "close-modal" &&
			!isTabSpaceKey;

		if (isEscapeKey || isModalElement || isCloseModalBtn) {
			e.preventDefault();
			onDisplayModal();
			if (onClose instanceof Function) {
				onClose(e);
			}
		}
	};

	modalElement.addEventListener("mousedown", (e) => {
		onOpenModal(e);
		onCloseModal(e);
	});
	modalElement.addEventListener("keydown", onCloseModal);

	return [modalElement, { onDisplayModal }] as const;
};
