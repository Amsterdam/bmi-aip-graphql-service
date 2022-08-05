import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { JunctionBox } from './models/junction-box.model';
import { JunctionBoxFactory } from './junction-box.factory';
import { JunctionBoxService } from './junction-box.service';
import { CreateJunctionBoxInput } from './dto/create-junction-box.input';
import { UpdateJunctionBoxInput } from './dto/update-junction-box.input';
import { CreateJunctionBoxCommand } from './commands/create-junction-box.command';
import { UpdateJunctionBoxCommand } from './commands/update-junction-box.command';
import { JunctionBox as DomainJunctionBox } from './types/junction-box.repository.interface';
import { DeleteJunctionBoxCommand } from './commands/delete-junction-box.command';

@Resolver((of) => JunctionBox)
@Resource(JunctionBox.name)
export class JunctionBoxResolver {
	constructor(private junctionBoxService: JunctionBoxService, private commandBus: CommandBus) {}

	@Mutation(() => JunctionBox)
	public async createJunctionBox(@Args('createJunctionBox') input: CreateJunctionBoxInput): Promise<JunctionBox> {
		const domainJunctionBox: DomainJunctionBox = await this.commandBus.execute<CreateJunctionBoxCommand>(
			new CreateJunctionBoxCommand(input),
		);
		return JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
	}

	@Mutation(() => JunctionBox)
	public async updateJunctionBox(@Args('updateJunctionBox') input: UpdateJunctionBoxInput): Promise<JunctionBox> {
		const domainJunctionBox: DomainJunctionBox = await this.commandBus.execute<UpdateJunctionBoxCommand>(
			new UpdateJunctionBoxCommand(input),
		);
		return JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
	}

	@Mutation(() => JunctionBox)
	public async deleteJunctionBox(@Args('identifier') identifier: string): Promise<JunctionBox> {
		const domainJunctionBox: DomainJunctionBox = await this.commandBus.execute<DeleteJunctionBoxCommand>(
			new DeleteJunctionBoxCommand(identifier),
		);
		return JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
	}

	@Query((returns) => [JunctionBox], { name: 'spanInstallationJunctionBoxes' })
	@Roles({ roles: ['realm:aip_owner'] })
	async getSurveyJunctionBoxes(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.junctionBoxService.getJunctionBoxes(surveyId);
	}
}
