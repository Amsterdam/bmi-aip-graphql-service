import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'objectWithMaintenanceMeasures' })
export class ObjectWithMaintenanceMeasuresModel {
	@Field((type) => ID)
	id: string;

	@Field((type) => String)
	code: string;
}
