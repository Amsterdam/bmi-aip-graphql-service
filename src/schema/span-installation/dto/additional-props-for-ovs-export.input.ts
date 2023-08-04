import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

import { NormalizedInstallationFromExcel } from '../../../services/types/excelRowObject';

@InputType()
export class AdditionalPropsForOVSExportInput {
	@Field()
	public installationGroup: number;

	@Field(() => GraphQLJSON)
	public source: NormalizedInstallationFromExcel;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public techViewId: number;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public mastId: number;
}
