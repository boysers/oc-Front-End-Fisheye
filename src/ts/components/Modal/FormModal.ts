import { formTemplate } from "../../templates/formTemplate";

type FormModalElementProps = {
	toggleModalDisplay: (nameId?: string) => void;
	title: string;
	openBtnElement: HTMLElement;
	modalElement: HTMLElement;
};

export const FormModal = (
	selector: string,
	{
		title,
		toggleModalDisplay,
		openBtnElement,
		modalElement,
	}: FormModalElementProps
) => {
	const formModal = document.querySelector(selector);

	formModal.innerHTML += formTemplate({ title: title });

	openBtnElement.addEventListener("click", () => {
		toggleModalDisplay("contact-modal");
		// modalElement
		// 	.querySelector<HTMLElement>("input[name='firstname']")
		// 	.focus();
		modalElement.style.backgroundColor = "rgba(196, 196, 196, 0.4)";
	});
	const formElement = formModal.querySelector("#form");

	formElement.addEventListener("submit", (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget as HTMLFormElement);

		const firstname = formData.get("firstname");
		const lastname = formData.get("lastname");
		const email = formData.get("email");
		const message = formData.get("message");

		console.log({ firstname, lastname, email, message });

		toggleModalDisplay();
	});

	return [formElement] as const;
};
