"use strict";

import { ModalComponent } from "./ModalComponent";
import { formContactModalTemplate } from "../templates/formContactModalTemplate";

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

		const firstname = formData.get("firstname");
		const lastname = formData.get("lastname");
		const email = formData.get("email");
		const message = formData.get("message");

		const data = { firstname, lastname, email, message };

		console.log(data);

		onDisplayModal();
		formElement.reset();
		openModalBtnElement.focus();
	};

	openModalBtnElement.addEventListener("click", handleOpenModalClick);
	formElement.addEventListener("submit", handleFormSubmit);

	return [formElement];
};
