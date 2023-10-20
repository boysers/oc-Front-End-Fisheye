"use strict";

/**
 * @typedef {Object} FormContactModalTemplateProps
 * @property {string} title
 */

/**
 * @param {FormContactModalTemplateProps} props
 * @returns {import('../types.js').HTMLTemplate}
 */
export function formContactModalTemplate({ title }) {
	return `
        <div>
            <header>
                <h2 id="formModalTitle">Contactez-moi<br/>${title}</h2>
                <img
                    src="icons/close.svg"
                    alt="Fermer le formulaire de contact"
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
                        class="field"
                    />
                    <p class="error" data-error="firstname"></p>
                </div>
                <div>
                    <label for="lastname">Nom</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        required
                        minlength="2"
                        class="field"
                    />
                    <p class="error" data-error="lastname"></p>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        required
                        class="field"
                    />
                    <p class="error" data-error="email"></p>
                </div>
                <div>
                    <label for="message">Votre message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        required
                        class="field"
                    ></textarea>
                    <div class="info-message">
                        <p id="compteur-message"></p>
                        <p class="error" data-error="message"></p>
                    </div>
                </div>
                <button type="submit" class="contact_button">Envoyer</button>
            </form>
        </div>
    `;
}
