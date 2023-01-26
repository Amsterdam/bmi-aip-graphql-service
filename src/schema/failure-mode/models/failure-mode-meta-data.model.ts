import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'failureModeMetaData' })
export class FailureModeMetaData {
	@Field((type) => String)
	public faalOorzaak?: string;

	@Field((type) => String)
	public bronVanValen?: string;

	@Field((type) => String)
	public gevolgVanFalen?: string;

	@Field((type) => String)
	public faaloorzaakAnders?: string;

	@Field((type) => String)
	public bronVanFalenAnders?: string;
}
