export class UnitHasMeasuresException extends Error {
	public constructor(unitId: string) {
		super(
			`Could not delete unit record for unitId ${unitId}; this unit has one or multiple (cyclic) measures associated with it`,
		);
	}
}
