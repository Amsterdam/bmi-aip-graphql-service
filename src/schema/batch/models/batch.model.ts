import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Company } from '../../company/models/company.model';

@ObjectType({ description: 'batch' })
export class Batch {
	@Field((type) => ID)
	public id: string;

	@Field((type) => String)
	public name: string;

	@Field((type) => String, { nullable: true, defaultValue: 'open' })
	public status?: string;

	@Field((type) => String, { nullable: true })
	public startDate?: string;

	@Field((type) => String, { nullable: true })
	public endDate?: string;

	@Field((type) => String, { nullable: true })
	public plannedStartDate?: string;

	@Field((type) => String, { nullable: true })
	public plannedEndDate?: string;

	@Field((type) => ID, { nullable: true })
	public contractId?: string;

	@Field((type) => ID, { nullable: true })
	public tranchId?: string;

	@Field((type) => String, { nullable: true })
	public remarks?: string;

	@Field((type) => Boolean, { nullable: true })
	public legacyFailureMode?: boolean;

	@Field((type) => Boolean, { nullable: true })
	public inspectionStandardTypes?: string[];

	@Field((type) => [Company], { nullable: true })
	public executorCompanies: Company[];
}
