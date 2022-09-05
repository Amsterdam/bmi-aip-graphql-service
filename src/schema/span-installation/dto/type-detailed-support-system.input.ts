import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, ValidateIf } from 'class-validator';

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
	@ValidateIf((o) => o.type === SupportSystemType.Mast)
	@IsEnum(SupportSystemTypeDetailedMast)
	@IsOptional()
	@Field((type) => SupportSystemTypeDetailedMast, { nullable: true })
	public typeDetailedMast: SupportSystemTypeDetailedMast;

	@ValidateIf((o) => o.type === SupportSystemType.Facade)
	@IsEnum(SupportSystemTypeDetailedFacade)
	@IsOptional()
	@Field((type) => SupportSystemTypeDetailedFacade, { nullable: true })
	public typeDetailedFacade: SupportSystemTypeDetailedFacade;

	@ValidateIf((o) => o.type === SupportSystemType.TensionWire)
	@IsEnum(SupportSystemTypeDetailedTensionWire)
	@IsOptional()
	@Field((type) => SupportSystemTypeDetailedTensionWire, { nullable: true })
	public typeDetailedTensionWire: SupportSystemTypeDetailedTensionWire;

	@ValidateIf((o) => o.type === SupportSystemType.Node)
	@IsEnum(SupportSystemTypeDetailedNode)
	@IsOptional()
	@Field((type) => SupportSystemTypeDetailedNode, { nullable: true })
	public typeDetailedNode: SupportSystemTypeDetailedNode;
}
