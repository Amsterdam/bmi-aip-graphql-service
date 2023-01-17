import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Validate } from 'class-validator';

import { JSONValue } from '../../../types/json-value';
import { ReachSegmentsAmountUnder26 } from '../../../validators/ReachSegmentsAmountUnder26';
import { NumberWithinRange } from '../../../validators/NumberWithinRange';

import { BaseArkSurveyInput } from './base-ark-survey.input';

@InputType()
export class UpdateArkSurveyInput extends BaseArkSurveyInput {
	@Field(() => GraphQLJSON, { nullable: true })
	@Validate(ReachSegmentsAmountUnder26)
	@Validate(NumberWithinRange, ['riskScoreDigit', 1.0, 16.0])
	@Validate(NumberWithinRange, ['failureModeScore', 1.0, 16.0])
	@Validate(NumberWithinRange, ['consequenceScore', 1.0, 4.0])
	public reachSegments?: JSONValue;
}
