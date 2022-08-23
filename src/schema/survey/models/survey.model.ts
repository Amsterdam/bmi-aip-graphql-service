import { Field, ObjectType } from '@nestjs/graphql';

ObjectType({ description: 'surveys' });
export class Survey {
	@Field((type) => String)
	id: string;
}
