"use strict";

import { sortbyTemplate } from "../templates/sortbyTemplate";

/**
 * @typedef {Object} SortByComponentOptions
 * @property {(e: Event, selectedSort: string) => void} [onChange]
 */

/**
 * Creates a SortBy component.
 * @param {string} selector
 * @param {SortByComponentOptions} options
 * @returns {[HTMLElement]}
 */
export const SortByComponent = (selector, { onChange } = {}) => {
	const sortbyElement = document.querySelector(selector);

	// Add the HTML template for the sort by component.
	sortbyElement.innerHTML += sortbyTemplate();
	const selectElement = sortbyElement.querySelector("#sort-select");

	const isOnChangeFunction = typeof onChange === "function";

	/**
	 * Handles the change event of the select element.
	 * @param {Event} e
	 */
	const handleSelectChange = (e) => {
		const isSelectElement = e.target instanceof HTMLSelectElement;

		if (isSelectElement && isOnChangeFunction) {
			onChange(e, e.target.value);
		}
	};

	selectElement.addEventListener("change", handleSelectChange);

	return [sortbyElement];
};
