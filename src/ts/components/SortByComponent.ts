import { sortbyTemplate } from "../templates/sortbyTemplate";

type SortByComponentProps = {
	onChange?: (e: Event, selectedSort: string) => void;
};

export const SortByComponent = (
	selector: string,
	{ onChange }: SortByComponentProps = {}
) => {
	const sortbyElement = document.querySelector(selector);
	sortbyElement.innerHTML += sortbyTemplate();

	const selectElement = sortbyElement.querySelector("#sort-select");
	const isOnChangeFunction = onChange instanceof Function;

	const handleSelectChange = (e: Event) => {
		const isSelectElement = e.target instanceof HTMLSelectElement;

		if (isSelectElement && isOnChangeFunction) {
			onChange(e, e.target.value);
		}
	};

	selectElement.addEventListener("change", handleSelectChange);

	return [sortbyElement] as const;
};
