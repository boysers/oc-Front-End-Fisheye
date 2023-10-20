"use strict";

import { ModalComponent } from "./ModalComponent";
import { formContactModalTemplate } from "../templates/formContactModalTemplate";
import { UserEntityException } from "../utils/UserEntityException";
import { User } from "../entities/User";
import { Validator } from "../utils/Validator";

/**
 * @typedef {Object} ContactFormModalOptions
 * @property {string} title
 * @property {HTMLElement} openModalBtnElement
 */

/**
 * Creates and manages a Contact Form Modal component.
 * @param {string} selector
 * @param {ContactFormModalOptions} options
 * @returns {[HTMLElement]}
 */
export const ContactFormModal = (selector, { title, openModalBtnElement }) => {
	// Create Modal Component.
	const [contactFormModalElement, { onDisplayModal }] = ModalComponent(
		selector,
		{
			onClose() {
				openModalBtnElement.focus();
			},
		}
	);
	contactFormModalElement.innerHTML += formContactModalTemplate({ title });
	contactFormModalElement.setAttribute("aria-describedby", "formModalTitle");

	const formElement = contactFormModalElement.querySelector("form");

	const textAreaElement = formElement.querySelector("textarea#message");

	// For textarea message
	const [, { resetCounter }] = initCounter();

	/**
	 * Initializes character counter for message
	 * @returns {[HTMLElement, {resetCounter: () => void}]}
	 */
	function initCounter() {
		let counter = 0;

		const counterMessage = formElement.querySelector("#compteur-message");
		const isCounterMessage = counterMessage instanceof HTMLElement;

		if (!isCounterMessage) return;

		counterMessage.innerHTML = `<span id="counter" class="error-counter">0</span>/200`;

		/** @type {HTMLElement} */
		const counterEl = counterMessage.querySelector("#counter");

		const resetCounter = () => {
			counter = 0;
			counterEl.classList.add("error-counter");
			counterEl.innerHTML = counter;
		};

		/**
		 * Event handler for input events.
		 * @param {Event} e
		 */
		const handleCounterInput = (e) => {
			const isTextAreaElement = e.target instanceof HTMLTextAreaElement;
			if (!isTextAreaElement) return;

			/** @type {HTMLTextAreaElement} */
			const target = e.target;
			const message = target.value;

			counter = message.length;

			counterEl.innerHTML = counter;

			const isValidMessage = Validator.isMessage(message, 50, 200);

			if (isValidMessage) {
				counterEl.classList.remove("error-counter");
				return;
			}

			counterEl.classList.add("error-counter");
		};

		textAreaElement.addEventListener("input", handleCounterInput);

		return [counterMessage, { resetCounter }];
	}

	/** Event handler for click events. */
	const handleOpenModalClick = () => {
		onDisplayModal();

		const closeBtn = contactFormModalElement.querySelector(
			'[data-js="close-modal"]'
		);
		closeBtn?.focus();
	};

	/**
	 * Event handler for submit events.
	 * @param {SubmitEvent} e
	 */
	const handleFormSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const inputs = formElement.elements;

		const firstname = String(formData.get("firstname"));
		const lastname = String(formData.get("lastname"));
		const email = String(formData.get("email"));
		const message = String(formData.get("message"));

		const userData = { firstname, lastname, email, message };

		const errorElements = formElement.querySelectorAll(".error");
		// Reset error fields
		errorElements.forEach((errorEl) => {
			errorEl.innerHTML = "";
			errorEl.classList.remove("open");
		});

		// Reset error fields
		const fieldElements =
			formElement.querySelectorAll(".field.field-error");
		fieldElements.forEach((fieldEl) => {
			fieldEl.classList.remove("field-error");
			fieldEl.setAttribute("aria-invalid", "false");
		});

		try {
			const user = User.create(userData);

			console.table(user.snapshot);

			onDisplayModal();
			formElement.reset();
			resetCounter();
			openModalBtnElement.focus();
		} catch (error) {
			if (error instanceof UserEntityException) {
				Object.entries(error.invalidProps).forEach(([key, value]) => {
					/** @type {HTMLElement | null} */
					const errorElement = formElement.querySelector(
						`[data-error="${key}"]`
					);

					if (!errorElement) return;

					errorElement.innerText = value;
					errorElement.classList.add("open");

					/** @type {HTMLInputElement | null} */
					const input = inputs[key];

					if (!input) return;

					input.classList.add("field-error");
					input.setAttribute("aria-invalid", "true");
				});
				return;
			}

			console.error(error);
		}
	};

	openModalBtnElement.addEventListener("click", handleOpenModalClick);
	formElement.addEventListener("submit", handleFormSubmit);

	return [formElement];
};
