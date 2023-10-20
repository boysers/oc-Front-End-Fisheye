"use strict";

import { UserEntityException } from "../utils/UserEntityException";
import { Validator } from "../utils/Validator";
import { cleanAndNormalizeString } from "../utils/normalizeString";

/**
 * @typedef {Object} TRule
 * @property {string} errorMessage
 * @property {(param: string) => boolean} validationFunction
 */

/** @typedef {Record<string, TRule>} TRules */

export class User {
	/**
	 * Static Function for create a new User
	 * @param {import('../types.js').IUser} props
	 * @returns {User}
	 */
	static create(props) {
		const user = new User(props);
		user._validate();

		return user;
	}

	/**
	 *	Private constructor!
	 * @param {import('../types.js').IUser} props
	 */
	constructor({ message, ...props }) {
		this._props = {
			...props,
			message: this._setMessage(message),
		};
	}

	/** return user snapshot */
	get snapshot() {
		return this._props;
	}

	/**
	 * Format string message
	 * @param {string} message
	 * @returns {string}
	 */
	_setMessage(message) {
		return cleanAndNormalizeString(message);
	}

	/**
	 *	Function of validation User
	 * @returns {void}
	 */
	_validate() {
		/** @type {TRules} */
		const rules = {
			firstname: {
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
				validationFunction: (first) => Validator.isName(first),
			},
			lastname: {
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du nom.",
				validationFunction: (last) => Validator.isName(last),
			},
			email: {
				errorMessage: "Veuillez entrer un email valide.",
				validationFunction: (email) => Validator.isEmailAddress(email),
			},
			message: {
				errorMessage:
					"Veuillez écrire un message contenant entre 50 à 200 caractères.",
				validationFunction: (message) =>
					Validator.isMessage(message, 50, 200),
			},
		};

		/** @type {Record<string, string>} */
		const invalidProps = {};

		Object.entries(this.snapshot).forEach(([key, value]) => {
			const rule = rules[key];

			if (!rule) return;

			const { validationFunction, errorMessage } = rule;

			if (validationFunction(value)) return;

			invalidProps[key] = errorMessage;
		});

		if (Object.keys(invalidProps).length > 0) {
			throw new UserEntityException(invalidProps);
		}
	}
}
