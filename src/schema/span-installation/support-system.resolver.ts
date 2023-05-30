import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SupportSystem } from './models/support-system.model';
import { SupportSystemFactory } from './support-system.factory';
import { SupportSystemService } from './support-system.service';
import { CreateSupportSystemInput } from './dto/create-support-system.input';
import { UpdateSupportSystemInput } from './dto/update-support-system.input';
import { CreateSupportSystemCommand } from './commands/create-support-system.command';
import { UpdateSupportSystemCommand } from './commands/update-support-system.command';
import { SupportSystem as DomainSupportSystem } from './types/support-system.repository.interface';
import { DeleteSupportSystemCommand } from './commands/delete-support-system.command';
import { Luminaire } from './models/luminaire.model';
import { FindSupportSystemLuminairesCommand } from './commands/find-support-system-luminaires.command';
import { FindSupportSystemsQuery } from './queries/find-support-systems.query';
import { SpanMeasure } from './models/span-measure.model';
import { FindSpanMeasuresByDecompositionIdCommand } from './commands/find-span-measures-by-decomposition-id.command';
import { CreateMissingSupportSystemInput } from './dto/create-missing-support-system.input';
import { CreateMissingSupportSystemCommand } from './commands/create-missing-support-system.command';
import { UpdateReviseSupportSystemInput } from './dto/update-revise-support-system.input';
import { UpdateReviseSupportSystemCommand } from './commands/update-revise-support-system.command';

@Resolver((of) => SupportSystem)
@Resource(SupportSystem.name)
export class SupportSystemResolver {
	constructor(
		private supportSystemService: SupportSystemService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => SupportSystem)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createSupportSystem(
		@Args('createSupportSystem') input: CreateSupportSystemInput,
	): Promise<SupportSystem> {
		const domainSupportSystem: DomainSupportSystem = await this.commandBus.execute<CreateSupportSystemCommand>(
			new CreateSupportSystemCommand(input),
		);
		return SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
	}

	@Mutation(() => SupportSystem)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateSupportSystem(
		@Args('updateSupportSystem') input: UpdateSupportSystemInput,
	): Promise<SupportSystem> {
		const domainSupportSystem: DomainSupportSystem = await this.commandBus.execute<UpdateSupportSystemCommand>(
			new UpdateSupportSystemCommand(input),
		);
		return SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
	}

	@Mutation(() => SupportSystem)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteSupportSystem(@Args('identifier') identifier: string): Promise<SupportSystem> {
		const domainSupportSystem: DomainSupportSystem = await this.commandBus.execute<DeleteSupportSystemCommand>(
			new DeleteSupportSystemCommand(identifier),
		);
		return SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
	}

	@Mutation(() => SupportSystem)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createMissingSupportSystem(
		@Args('createMissingSupportSystem') input: CreateMissingSupportSystemInput,
	): Promise<SupportSystem> {
		const domainReviseSupportSystem: DomainSupportSystem =
			await this.commandBus.execute<CreateMissingSupportSystemCommand>(
				new CreateMissingSupportSystemCommand(input),
			);
		return SupportSystemFactory.CreateSupportSystem(domainReviseSupportSystem);
	}

	@Mutation(() => SupportSystem)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateReviseSupportSystem(
		@Args('updateReviseSupportSystem') input: UpdateReviseSupportSystemInput,
	): Promise<SupportSystem> {
		const domainReviseSupportSystem: DomainSupportSystem =
			await this.commandBus.execute<UpdateReviseSupportSystemCommand>(
				new UpdateReviseSupportSystemCommand(input),
			);
		return SupportSystemFactory.CreateSupportSystem(domainReviseSupportSystem);
	}

	@Query((returns) => [SupportSystem], { name: 'spanInstallationSupportSystems' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async getSurveySupportSystems(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.queryBus.execute<FindSupportSystemsQuery>(new FindSupportSystemsQuery(surveyId));
	}

	@ResolveField((type) => [Luminaire])
	async luminaires(@Parent() { id }: SupportSystem): Promise<Luminaire[]> {
		return this.commandBus.execute<FindSupportSystemLuminairesCommand>(new FindSupportSystemLuminairesCommand(id));
	}

	@ResolveField((type) => [SpanMeasure])
	async spanMeasures(@Parent() { id }: SpanMeasure): Promise<SpanMeasure[]> {
		return this.commandBus.execute<FindSpanMeasuresByDecompositionIdCommand>(
			new FindSpanMeasuresByDecompositionIdCommand(id),
		);
	}
}
