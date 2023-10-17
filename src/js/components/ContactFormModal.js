import { formContactModalTemplate } from "../templates/formContactModalTemplate";
import { ModalComponent } from "./ModalComponent";

/**
 * @typedef {Object} ContactFormModalProps
 * @property {string} title
 * @property {HTMLElement} openModalBtnElement
 */

/**
 * @param {string} selector
 * @param {ContactFormModalProps} options
 * @returns {[HTMLElement]}
 */
export const ContactFormModal = (selector, { title, openModalBtnElement }) => {
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

	openModalBtnElement.addEventListener("click", () => {
		onDisplayModal();

		const closeBtn = contactFormModalElement.querySelector(
			'[data-js="close-modal"]'
		);
		closeBtn.focus();
	});

	formElement.addEventListener("submit", (e) => {
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
	});

	return [formElement];
};
