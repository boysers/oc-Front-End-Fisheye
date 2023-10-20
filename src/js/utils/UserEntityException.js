"use strict";

/** Exception for Entity User */
export class UserEntityException extends Error {
	/** @param {Record<string, string>} invalidProps */
	constructor(invalidProps) {
		super();

		this.name = "User Entity Exception";
		this.message = JSON.stringify(invalidProps);

		this.invalidProps = invalidProps;
	}
}
