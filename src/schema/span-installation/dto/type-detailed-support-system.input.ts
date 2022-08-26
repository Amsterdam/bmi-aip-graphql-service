import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, ValidateIf } from 'class-validator';

import {
	SupportSystemType,
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../types';

import { BaseSupportSystemInput } from './base-support-system.input';

@InputType()
export class TypeDetailedSupportSystemInput extends BaseSupportSystemInput {
	/**
	 * It is not possible to expose a property through GraphQL which represents a union of enums.
	 * Therefor we expose each as a separate property.
	 */
	@ValidateIf((o) => o.type === SupportSystemType.mast)
	@IsEnum(SupportSystemTypeDetailedMast)
	// @IsOptional()
	@Field((type) => SupportSystemTypeDetailedMast, { nullable: true })
	public typeDetailedMast: SupportSystemTypeDetailedMast;

	@ValidateIf((o) => o.type === SupportSystemType.facade)
	@IsEnum(SupportSystemTypeDetailedFacade)
	// @IsOptional()
	@Field((type) => SupportSystemTypeDetailedFacade, { nullable: true })
	public typeDetailedFacade: SupportSystemTypeDetailedFacade;

	@ValidateIf((o) => o.type === SupportSystemType.tensionWire)
	@IsEnum(SupportSystemTypeDetailedTensionWire)
	// @IsOptional()
	@Field((type) => SupportSystemTypeDetailedTensionWire, { nullable: true })
	public typeDetailedTensionWire: SupportSystemTypeDetailedTensionWire;

	@ValidateIf((o) => o.type === SupportSystemType.node)
	@IsEnum(SupportSystemTypeDetailedNode)
	// @IsOptional()
	@Field((type) => SupportSystemTypeDetailedNode, { nullable: true })
	public typeDetailedNode: SupportSystemTypeDetailedNode;
}
