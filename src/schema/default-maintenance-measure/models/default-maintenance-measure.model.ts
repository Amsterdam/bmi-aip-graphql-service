import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'defaultMaintenanceMeasure' })
export class DefaultMaintenanceMeasure {
	@Field((type) => ID)
	id: string;

	@Field((type) => ID)
	objectTypeUnitCodeId?: string;

	@Field((type) => String, { nullable: true })
	material?: string;

	@Field((type) => String, { nullable: true })
	description?: string;

	@Field((type) => Number, { nullable: true })
	cycle?: number;

	@Field((type) => String, { nullable: true })
	maintenanceType?: string;

	@Field((type) => String, { nullable: true })
	quantityUnitOfMeasurement?: string;

	@Field((type) => Number, { nullable: true })
	unitPrice?: number;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
