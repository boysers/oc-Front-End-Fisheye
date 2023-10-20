"use strict";

import "../../css/modal.css";

/**
 * @typedef {Object} ModalComponentOptions
 * @property {(e: Event | KeyboardEvent) => void} [onClose]
 * @property {(e: Event) => void} [onOpen]
 * @property {(e: KeyboardEvent) => void} [onKeydown]
 */

/**
 * Creates and manages a Modal Component.
 * @param {string} selector
 * @param {ModalComponentOptions} options
 * @returns {[HTMLElement, { onDisplayModal: () => void }]}
 */
export const ModalComponent = (
	selector,
	{ onClose, onOpen, onKeydown } = {}
) => {
	const modalElement = document.querySelector(selector);

	const body = document.body;
	const mainWrapper = body.children[0];

	const isOnClose = onClose instanceof Function;
	const isOnOpen = onOpen instanceof Function;
	const isOnKeydown = onKeydown instanceof Function;

	/** Function to display or hide the modal. */
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

	// Function to open the modal.
	const onOpenModal = (e) => {
		if (modalElement.classList.contains("open")) return;
		e.preventDefault();
		onDisplayModal();
		if (isOnOpen) {
			onOpen(e);
		}
	};

	// Function to close the modal.
	const onCloseModal = (e) => {
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
			// e.preventDefault();
			onDisplayModal();
			if (isOnClose) {
				onClose(e);
			}
		}
	};

	/**
	 * Event handler for mousedown events.
	 * @param {Event} e
	 */
	const handleMousedown = (e) => {
		onOpenModal(e);
		onCloseModal(e);
	};

	/**
	 * Event handler for keydown events.
	 * @param {KeyboardEvent} e
	 */
	const handleKeydown = (e) => {
		onCloseModal(e);
		if (isOnKeydown) onKeydown(e);
	};

	modalElement.addEventListener("mousedown", handleMousedown);
	modalElement.addEventListener("keydown", handleKeydown);

	return [modalElement, { onDisplayModal }];
};
