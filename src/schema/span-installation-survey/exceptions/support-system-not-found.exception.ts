export class SupportSystemNotFoundException extends Error {
	public constructor(supportSystemId: string) {
		super(`Could not find support system record for supportSystemId ${supportSystemId}`);
	}
}
