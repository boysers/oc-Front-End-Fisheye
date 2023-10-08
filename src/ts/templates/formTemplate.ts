type FormTemplateProps = { title: string };

export function formTemplate({ title }: FormTemplateProps) {
	return `
        <header>
            <h2 id="title-modal">Contactez-moi<br/>${title}</h2>
            <img
                src="icons/close.svg"
                alt="Close contact form"
                data-js="close-modal"
                tabindex="0"
                role="button"
            />
        </header>
        <form id="form">
            <div>
                <label for="firstname">Prénom</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                />
            </div>
            <div>
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" required />
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div>
                <label for="message">Votre message</label>
                <textarea
                    id="message"
                    name="message"
                    rows="6"
                    spellcheck
                    required
                ></textarea>
            </div>
            <button class="contact_button">Envoyer</button>
        </form>
    `;
}
