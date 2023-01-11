import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import { NormalizedInstallationFromExcel } from '../../../services/types/excelRowObject';

@InputType()
export class CorrectCoordinatesInput {
	@Field()
	public installationGroup: number;

	@Field(() => GraphQLJSON)
	public source: NormalizedInstallationFromExcel;
}
