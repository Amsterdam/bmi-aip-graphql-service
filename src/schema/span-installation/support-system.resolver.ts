import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resource, Roles } from 'nest-keycloak-connect';

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

@Resolver((of) => SupportSystem)
@Resource(SupportSystem.name)
export class SupportSystemResolver {
	constructor(
		private supportSystemService: SupportSystemService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => SupportSystem)
	public async createSupportSystem(
		@Args('createSupportSystem') input: CreateSupportSystemInput,
	): Promise<SupportSystem> {
		const domainSupportSystem: DomainSupportSystem = await this.commandBus.execute<CreateSupportSystemCommand>(
			new CreateSupportSystemCommand(input),
		);
		return SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
	}

	@Mutation(() => SupportSystem)
	public async updateSupportSystem(
		@Args('updateSupportSystem') input: UpdateSupportSystemInput,
	): Promise<SupportSystem> {
		const domainSupportSystem: DomainSupportSystem = await this.commandBus.execute<UpdateSupportSystemCommand>(
			new UpdateSupportSystemCommand(input),
		);
		return SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
	}

	@Mutation(() => SupportSystem)
	public async deleteSupportSystem(@Args('identifier') identifier: string): Promise<SupportSystem> {
		const domainSupportSystem: DomainSupportSystem = await this.commandBus.execute<DeleteSupportSystemCommand>(
			new DeleteSupportSystemCommand(identifier),
		);
		return SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
	}

	@Query((returns) => [SupportSystem], { name: 'spanInstallationSupportSystems' })
	@Roles({ roles: ['realm:aip_owner'] })
	async getSurveySupportSystems(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.queryBus.execute<FindSupportSystemsQuery>(new FindSupportSystemsQuery(surveyId));
	}

	@ResolveField((type) => [Luminaire])
	async luminaires(@Parent() { type }: SupportSystem): Promise<Luminaire[]> {
		return this.commandBus.execute<FindSupportSystemLuminairesCommand>(
			new FindSupportSystemLuminairesCommand(type),
		);
	}
}
