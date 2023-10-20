"use-strict";

import { cleanAndNormalizeString } from "./normalizeString";

export class Validator {
	/**
	 * Function valid name
	 * @param {string} name
	 * @returns {boolean}
	 */
	static isName(name) {
		if (typeof name !== "string") return false;

		const trimmedName = name.trim();
		const isNonEmptyString = trimmedName.length >= 2;
		const contaisOnlyLetters = /^[a-zA-Z]+$/.test(trimmedName);

		return isNonEmptyString && contaisOnlyLetters;
	}

	/**
	 * Function valid email.
	 * @param {string} email
	 * @returns {boolean}
	 */
	static isEmailAddress(email) {
		const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		return emailRegExp.test(email);
	}

	/**
	 * Function valid message
	 * @param {string} message
	 * @param {number} [minLength=50] - minimun length | Default = 50
	 * @param {number} [maxLength=250] - maximum length | Default = 250
	 * @returns {boolean}
	 */
	static isMessage(message, minLength = 50, maxLength = 250) {
		const normalizeMessage = cleanAndNormalizeString(message);

		const isMinLength = normalizeMessage.length >= minLength;
		const isMaxLength = normalizeMessage.length <= maxLength;

		return isMinLength && isMaxLength;
	}
}
