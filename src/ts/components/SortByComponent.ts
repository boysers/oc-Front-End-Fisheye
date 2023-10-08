import { sortbyTemplate } from "../templates/sortbyTemplate";

type Props = { onChange?: (e: Event, selectedSort: string) => void };

export const SortByComponent = (selector: string, { onChange }: Props = {}) => {
	const sortbyElement = document.querySelector(selector);
	sortbyElement.innerHTML += sortbyTemplate();

	const listbox = sortbyElement.querySelector("#listbox1");
	const options = listbox.querySelectorAll<HTMLElement>(".listbox-option");

	let currentOption = "popularity";

	const handleOptionSelection = (e: Event, option: HTMLElement) => {
		options.forEach((opt) => {
			opt.classList.remove("selected");
			opt.setAttribute("aria-selected", "false");
		});

		option.classList.add("selected");
		option.setAttribute("aria-selected", "true");
		option.focus();

		if (onChange instanceof Function) {
			onChange(e, option.getAttribute("aria-valuetext"));
		}
	};

	const handleKeyEnterSpace = (e: KeyboardEvent) => {
		const isKeyEnter = e.key === "Enter";
		const isKeySpace = e.key === " ";

		if (isKeyEnter || isKeySpace) {
			const option = document.activeElement as HTMLElement;
			if (option == listbox) return;

			const value = option.getAttribute("aria-valuetext");
			if (currentOption == value) return;

			currentOption = value;

			handleOptionSelection(e, option);

			e.preventDefault();
		}
	};

	const handleKeyArrowUpDown = (e: KeyboardEvent) => {
		const isKeyArrowUp = e.key == "ArrowUp";
		const isKeyArrowDown = e.key == "ArrowDown";

		if (isKeyArrowUp || isKeyArrowDown) {
			const currentOption = document.activeElement as HTMLElement;
			const index = Array.from(options).indexOf(currentOption);

			if (e.key == "ArrowUp" && index > 0) {
				options[index - 1].focus();
			} else if (e.key == "ArrowDown" && index < options.length - 1) {
				options[index + 1].focus();
			}

			e.preventDefault();
		}
	};

	listbox.addEventListener("click", (e) => {
		if (e.target instanceof HTMLElement) {
			const option = e.target;
			handleOptionSelection(e, option);
		}
	});

	listbox.addEventListener("keydown", (e) => {
		if (e instanceof KeyboardEvent) {
			handleKeyEnterSpace(e);
			handleKeyArrowUpDown(e);
		}
	});

	return [sortbyElement] as const;
};
