import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsUUID, MaxLength } from 'class-validator';

import {
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../types';

import { BaseSupportSystemInput } from './base-support-system.input';

@InputType()
export class CreateSupportSystemNormalizedInput extends BaseSupportSystemInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@IsUUID()
	public objectId: string;

	@Field()
	@IsUUID()
	public surveyId: string;

	@IsIn([
		...Object.keys(SupportSystemTypeDetailedMast),
		...Object.keys(SupportSystemTypeDetailedFacade),
		...Object.keys(SupportSystemTypeDetailedTensionWire),
		...Object.keys(SupportSystemTypeDetailedNode),
	])
	@Field({ nullable: true })
	public typeDetailed: string;
}
