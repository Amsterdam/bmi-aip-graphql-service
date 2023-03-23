import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'failureModeMetaData' })
export class FailureModeMetaData {
	@Field((type) => String)
	public failureCause?: string; //faalOorzaak

	@Field((type) => String)
	public sourceOfFailure?: string; //bronVanFalen

	@Field((type) => String)
	public consequenceOfFailure?: string; //gevolgVanFalen

	@Field((type) => String)
	public causeOfFailureOther?: string; //faaloorzaakAnders

	@Field((type) => String)
	public sourceOfFailureOther?: string; //bronVanFalenAnders
}
