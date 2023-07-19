import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { HasDecompositionItemGotDamageQuery } from '../span-installation-survey/queries/has-decomposition-item-got-damage.query';

import { Luminaire } from './models/luminaire.model';
import { LuminaireFactory } from './luminaire.factory';
import { LuminaireService } from './luminaire.service';
import { CreateLuminaireInput } from './dto/create-luminaire.input';
import { UpdateLuminaireInput } from './dto/update-luminaire.input';
import { CreateLuminaireCommand } from './commands/create-luminaire.command';
import { UpdateLuminaireCommand } from './commands/update-luminaire.command';
import { Luminaire as DomainLuminaire } from './types/luminaire.repository.interface';
import { DeleteLuminaireCommand } from './commands/delete-luminaire.command';
import { SpanMeasure } from './models/span-measure.model';
import { FindSpanMeasuresByDecompositionItemIdQuery } from './queries/find-span-measures-by-decomposition-item-id.query';
import { CreateMissingLuminaireCommand } from './commands/create-missing-luminaire.command';
import { CreateMissingLuminaireInput } from './dto/create-missing-luminaire.input';
import { ReviseLuminaireInput } from './dto/revise-luminaire.input';
import { ReviseLuminaireCommand } from './commands/revise-luminaire.command';
import { SpanDecompositionItemType } from './types/span-decomposition-item-type';

@Resolver((of) => Luminaire)
@Resource(Luminaire.name)
export class LuminaireResolver {
	constructor(
		private luminaireService: LuminaireService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => Luminaire)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createLuminaire(@Args('createLuminaire') input: CreateLuminaireInput): Promise<Luminaire> {
		const domainLuminaire: DomainLuminaire = await this.commandBus.execute<CreateLuminaireCommand>(
			new CreateLuminaireCommand(input),
		);
		return LuminaireFactory.CreateLuminaire(domainLuminaire);
	}

	@Mutation(() => Luminaire)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateLuminaire(@Args('updateLuminaire') input: UpdateLuminaireInput): Promise<Luminaire> {
		const domainLuminaire: DomainLuminaire = await this.commandBus.execute<UpdateLuminaireCommand>(
			new UpdateLuminaireCommand(input),
		);
		return LuminaireFactory.CreateLuminaire(domainLuminaire);
	}

	@Mutation(() => Luminaire)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteLuminaire(@Args('identifier') identifier: string): Promise<Luminaire> {
		const domainLuminaire: DomainLuminaire = await this.commandBus.execute<DeleteLuminaireCommand>(
			new DeleteLuminaireCommand(identifier),
		);
		return LuminaireFactory.CreateLuminaire(domainLuminaire);
	}

	@Mutation(() => Luminaire)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createMissingLuminaire(
		@Args('createMissingLuminaire') input: CreateMissingLuminaireInput,
	): Promise<Luminaire> {
		const domainReviseLuminaire: DomainLuminaire = await this.commandBus.execute<CreateMissingLuminaireCommand>(
			new CreateMissingLuminaireCommand(input),
		);
		return LuminaireFactory.CreateLuminaire(domainReviseLuminaire);
	}

	@Mutation(() => Luminaire)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async reviseLuminaire(@Args('reviseLuminaire') input: ReviseLuminaireInput): Promise<Luminaire> {
		const domainReviseLuminaire: DomainLuminaire = await this.commandBus.execute<ReviseLuminaireCommand>(
			new ReviseLuminaireCommand(input),
		);
		return LuminaireFactory.CreateLuminaire(domainReviseLuminaire);
	}

	@Query((returns) => [Luminaire], { name: 'spanInstallationLuminaires' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async getsupportSystemLuminaires(@Args('supportSystemId', { type: () => String }) supportSystemId: string) {
		return this.luminaireService.getLuminaires(supportSystemId);
	}

	@ResolveField((type) => [SpanMeasure])
	async spanMeasures(@Parent() { id }: SpanMeasure): Promise<SpanMeasure[]> {
		return this.queryBus.execute<FindSpanMeasuresByDecompositionItemIdQuery>(
			new FindSpanMeasuresByDecompositionItemIdQuery(id),
		);
	}

	@ResolveField()
	async hasDamage(@Parent() { id }: Luminaire): Promise<boolean> {
		return this.queryBus.execute<HasDecompositionItemGotDamageQuery>(
			new HasDecompositionItemGotDamageQuery(id, SpanDecompositionItemType.spanLuminaire),
		);
	}
}
