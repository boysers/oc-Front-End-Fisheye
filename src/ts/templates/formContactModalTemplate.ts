type FormTemplateProps = { title: string };

export function formContactModalTemplate({ title }: FormTemplateProps) {
	return `
        <div>
            <header>
            <h2>Contactez-moi<br/>${title}</h2>
            <img
                src="icons/close.svg"
                alt="Close contact form"
                data-js="close-modal"
                tabindex="0"
                role="button"
            />
            </header>
            <form>
                <div>
                    <label for="firstname">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        required
                        minlength="2"
                    />
                </div>
                <div>
                    <label for="lastname">Nom</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        required
                        minlength="2"
                    />
                </div>
                <div>
                    <label for="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div>
                    <label for="message">Votre message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        spellcheck
                        required
                        minlength="20"
                    ></textarea>
                </div>
                <button type="submit" class="contact_button">Envoyer</button>
            </form>
        </div>
    `;
}
