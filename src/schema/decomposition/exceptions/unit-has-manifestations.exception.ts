export class UnitHasManifestationsException extends Error {
	public constructor(unitId: string) {
		super(
			`Could not delete unit record for unitId ${unitId}; this unit has one or multiple manifestations associated with it`,
		);
	}
}
