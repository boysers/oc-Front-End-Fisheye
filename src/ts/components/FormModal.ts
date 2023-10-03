import { formTemplate } from "../templates/formTemplate";

type FormModalElementProps = {
	modalElement: HTMLElement;
	openBtnElement: HTMLElement;
};

type FormModalParamProps = {
	toggleModalDisplay: (nameId?: string) => void;
	title: string;
};

export const FormModal = (
	{ modalElement, openBtnElement }: FormModalElementProps,
	{ title, toggleModalDisplay }: FormModalParamProps
) => {
	modalElement.innerHTML += formTemplate({ title: title });

	openBtnElement.addEventListener("click", () => {
		toggleModalDisplay("contact-modal");
		modalElement.style.backgroundColor = "rgba(196, 196, 196, 0.4)";
	});
	const formElement = modalElement
		.querySelector("#contact-modal form")
		.addEventListener("submit", (e) => {
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
