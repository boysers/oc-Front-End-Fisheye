import "../../css/modal.css";

type ModalComponentProps = {
	onClose?: (e: Event | KeyboardEvent) => void;
	onOpen?: (e: Event) => void;
	onKeydown?: (e: KeyboardEvent) => void;
};

export const ModalComponent = (
	selector: string,
	{ onClose, onOpen, onKeydown }: ModalComponentProps = {}
) => {
	const modalElement = document.querySelector<HTMLElement>(selector);
	const body = document.body;
	const mainWrapper = body.children[0] as HTMLElement;
	const isOnKeydown = onKeydown instanceof Function;

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
		modalElement.focus();
	};

	const onOpenModal = (e: Event) => {
		if (modalElement.classList.contains("open")) return;
		e.preventDefault();
		onDisplayModal();
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

		const isTabSpaceKey =
			isKeyboardEvent && e.key != " " && e.key != "Enter";
		const isCloseModalBtn =
			isTargetElement &&
			e.target.getAttribute("data-js") == "close-modal" &&
			!isTabSpaceKey;

		if (isEscapeKey || isCloseModalBtn) {
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
	document.addEventListener("keydown", (e) => {
		onCloseModal(e);
		if (isOnKeydown) onKeydown(e);
	});

	return [modalElement, { onDisplayModal }] as const;
};
