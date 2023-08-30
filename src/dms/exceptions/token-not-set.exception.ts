export class TokenNotSetException extends Error {
	public constructor() {
		super('Attempting request to DMS without setting token first. Please set token first');
	}
}
