import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'object' })
export class CorrectCoordinatesModel {
	@Field((type) => String)
	success: string;
}
