import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'geographyRD' })
export class GeographyRD {
	@Field((type) => Number)
	x?: number;

	@Field((type) => Number)
	y?: number;
}
