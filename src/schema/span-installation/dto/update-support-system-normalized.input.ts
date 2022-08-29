import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional, IsUUID, MaxLength } from 'class-validator';

import {
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../types';

import { BaseSupportSystemInput } from './base-support-system.input';

@InputType()
export class UpdateSupportSystemNormalizedInput extends BaseSupportSystemInput {
	@Field()
	@IsUUID()
	public id: string;

	@IsOptional()
	@Field()
	@MaxLength(255)
	public name?: string;

	@IsIn([
		...Object.keys(SupportSystemTypeDetailedMast),
		...Object.keys(SupportSystemTypeDetailedFacade),
		...Object.keys(SupportSystemTypeDetailedTensionWire),
		...Object.keys(SupportSystemTypeDetailedNode),
	])
	@Field()
	public typeDetailed: string;
}
