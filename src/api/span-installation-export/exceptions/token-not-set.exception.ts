export class TokenNotSetException extends Error {
	public constructor() {
		super('Missing authorization header with bearer token');
	}
}
