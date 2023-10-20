"use strict";

/**  @returns {import('../types.js').HTMLTemplate} */
export const sortbyTemplate = () => {
	return `
        <label for="sort-select">Trier par</label>
        <select name="sort-select" id="sort-select" aria-label="Order by">
            <option value="popularity">Popularité</option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
        </select>
    `;
};
