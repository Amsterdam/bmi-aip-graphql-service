import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Validate } from 'class-validator';

import { JSONValue } from '../../../types/json-value';
import { ReachSegmentsAmountUnder26 } from '../../../validators/ReachSegmentsAmountUnder26';

import { BaseArkSurveyInput } from './base-ark-survey.input';

@InputType()
export class UpdateArkSurveyInput extends BaseArkSurveyInput {
	@Field(() => GraphQLJSON, { nullable: true })
	@Validate(ReachSegmentsAmountUnder26)
	public reachSegments?: JSONValue;
}
