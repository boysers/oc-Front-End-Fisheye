import { sortbyTemplate } from "../templates/sortbyTemplate";

/**
 * @typedef {Object} SortByComponentProps
 * @property {(e: Event, selectedSort: string) => void} [onChange]
 */

/**
 * @param {string} selector
 * @param {SortByComponentProps} options
 * @returns {[HTMLElement]}
 */
export const SortByComponent = (
    selector,
    { onChange } = {}
) => {
    const sortbyElement = document.querySelector(selector);
    sortbyElement.innerHTML += sortbyTemplate();

    const selectElement = sortbyElement.querySelector("#sort-select");
    const isOnChangeFunction = typeof onChange === "function";

    const handleSelectChange = (e) => {
        const isSelectElement = e.target instanceof HTMLSelectElement;

        if (isSelectElement && isOnChangeFunction) {
            onChange(e, e.target.value);
        }
    };

    selectElement.addEventListener("change", handleSelectChange);

    return [sortbyElement];
};
