
export const sortbyTemplate = () => {
	return `
        <p class="listbox1label" role="label">Trier par</p>
        <div
            role="listbox"
            tabindex="0"
            id="listbox1"
            aria-labelledby="listbox1label"
            aria-activedescendant="listbox1-1"
            >
            <div 
                role"option"
                id="listbox1-1"
                class="listbox-option selected"
                tabindex="-1"
                aria-valuetext="popularity"
            >Popularité</div>
            <div 
                role"option"
                id="listbox1-2"
                class="listbox-option"
                tabindex="-1"
                aria-valuetext="date"
            >Date</div>
            <div 
                role"option"
                id="listbox1-3"
                class="listbox-option"
                tabindex="-1"
                aria-valuetext="title"
            >Titre</div>
        </div>
    `;
};
