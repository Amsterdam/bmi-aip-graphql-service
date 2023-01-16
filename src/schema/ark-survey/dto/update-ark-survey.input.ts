import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { JSONValue } from '../../../types/json-value';

import { BaseArkSurveyInput } from './base-ark-survey.input';

@InputType()
export class UpdateArkSurveyInput extends BaseArkSurveyInput {
	@Field(() => GraphQLJSON, { nullable: true })
	public reachSegments?: JSONValue;
}
