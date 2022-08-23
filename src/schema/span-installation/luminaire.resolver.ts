import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, Roles } from 'nest-keycloak-connect';
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

@Resolver((of) => Luminaire)
@Resource(Luminaire.name)
export class LuminaireResolver {
	constructor(private luminaireService: LuminaireService, private commandBus: CommandBus) {}

	@Mutation(() => Luminaire)
	public async createLuminaire(@Args('createLuminaire') input: CreateLuminaireInput): Promise<Luminaire> {
		const domainLuminaire: DomainLuminaire = await this.commandBus.execute<CreateLuminaireCommand>(
			new CreateLuminaireCommand(input),
		);
		return LuminaireFactory.CreateLuminaire(domainLuminaire);
	}

	@Mutation(() => Luminaire)
	public async updateLuminaire(@Args('updateLuminaire') input: UpdateLuminaireInput): Promise<Luminaire> {
		const domainLuminaire: DomainLuminaire = await this.commandBus.execute<UpdateLuminaireCommand>(
			new UpdateLuminaireCommand(input),
		);
		return LuminaireFactory.CreateLuminaire(domainLuminaire);
	}

	@Mutation(() => Luminaire)
	public async deleteLuminaire(@Args('identifier') identifier: string): Promise<Luminaire> {
		const domainLuminaire: DomainLuminaire = await this.commandBus.execute<DeleteLuminaireCommand>(
			new DeleteLuminaireCommand(identifier),
		);
		return LuminaireFactory.CreateLuminaire(domainLuminaire);
	}

	@Query((returns) => [Luminaire], { name: 'spanInstallationLuminaires' })
	@Roles({ roles: ['realm:aip_owner'] })
	async getsupportSystemLuminaires(@Args('supportSystemId', { type: () => String }) supportSystemId: string) {
		return this.luminaireService.getLuminaires(supportSystemId);
	}
}
