export class ElementHasUnitsException extends Error {
	public constructor(elementId: string) {
		super(
			`Could not delete element record for elementId ${elementId}; this element has one or multiple units associated with it`,
		);
	}
}
