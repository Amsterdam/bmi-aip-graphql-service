import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

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
import { FindSpanMeasuresByDecompositionIdCommand } from './commands/find-span-measures-by-decomposition-id.command';
import { CreateMissingLuminaireCommand } from './commands/create-missing-luminaire.command';
import { CreateMissingLuminaireInput } from './dto/create-missing-luminaire.input';
import { UpdateReviseLuminaireInput } from './dto/update-revise-luminaire.input';
import { UpdateReviseLuminaireCommand } from './commands/update-revise-luminaire.command';

@Resolver((of) => Luminaire)
@Resource(Luminaire.name)
export class LuminaireResolver {
	constructor(private luminaireService: LuminaireService, private commandBus: CommandBus) {}

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
	public async createReviseLuminaire(
		@Args('createReviseLuminaire') input: CreateMissingLuminaireInput,
	): Promise<Luminaire> {
		const domainReviseLuminaire: DomainLuminaire = await this.commandBus.execute<CreateMissingLuminaireCommand>(
			new CreateMissingLuminaireCommand(input),
		);
		return LuminaireFactory.CreateLuminaire(domainReviseLuminaire);
	}

	@Mutation(() => Luminaire)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateReviseLuminaire(
		@Args('updateReviseLuminaire') input: UpdateReviseLuminaireInput,
	): Promise<Luminaire> {
		const domainReviseLuminaire: DomainLuminaire = await this.commandBus.execute<UpdateReviseLuminaireCommand>(
			new UpdateReviseLuminaireCommand(input),
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
		return this.commandBus.execute<FindSpanMeasuresByDecompositionIdCommand>(
			new FindSpanMeasuresByDecompositionIdCommand(id),
		);
	}
}
