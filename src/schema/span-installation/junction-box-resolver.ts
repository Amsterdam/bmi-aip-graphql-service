import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
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
import { SpanMeasure } from './models/span-measure.model';
import { FindSpanMeasuresByDecompositionIdCommand } from './commands/find-span-measures-by-decomposition-id.command';
import { CreateMissingJunctionBoxInput } from './dto/create-missing-junction-box.input';
import { CreateMissingJunctionBoxCommand } from './commands/create-missing-junction-box.command';
import { UpdateReviseJunctionBoxCommand } from './commands/update-revise-junction-box.command';
import { UpdateReviseJunctionBoxInput } from './dto/update-revise-junction-box.input';

@Resolver((of) => JunctionBox)
@Resource(JunctionBox.name)
export class JunctionBoxResolver {
	constructor(private junctionBoxService: JunctionBoxService, private commandBus: CommandBus) {}

	@Mutation(() => JunctionBox)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createJunctionBox(@Args('createJunctionBox') input: CreateJunctionBoxInput): Promise<JunctionBox> {
		const domainJunctionBox: DomainJunctionBox = await this.commandBus.execute<CreateJunctionBoxCommand>(
			new CreateJunctionBoxCommand(input),
		);
		return JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
	}

	@Mutation(() => JunctionBox)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateJunctionBox(@Args('updateJunctionBox') input: UpdateJunctionBoxInput): Promise<JunctionBox> {
		const domainJunctionBox: DomainJunctionBox = await this.commandBus.execute<UpdateJunctionBoxCommand>(
			new UpdateJunctionBoxCommand(input),
		);
		return JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
	}

	@Mutation(() => JunctionBox)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteJunctionBox(@Args('identifier') identifier: string): Promise<JunctionBox> {
		const domainJunctionBox: DomainJunctionBox = await this.commandBus.execute<DeleteJunctionBoxCommand>(
			new DeleteJunctionBoxCommand(identifier),
		);
		return JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
	}

	@Mutation(() => JunctionBox)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createReviseJunctionBox(
		@Args('createReviseJunctionBox') input: CreateMissingJunctionBoxInput,
	): Promise<JunctionBox> {
		const domainReviseJunctionBox: DomainJunctionBox =
			await this.commandBus.execute<CreateMissingJunctionBoxCommand>(new CreateMissingJunctionBoxCommand(input));
		return JunctionBoxFactory.CreateJunctionBox(domainReviseJunctionBox);
	}

	@Mutation(() => JunctionBox)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateReviseJunctionBox(
		@Args('updateReviseJunctionBox') input: UpdateReviseJunctionBoxInput,
	): Promise<JunctionBox> {
		const domainReviseJunctionBox: DomainJunctionBox =
			await this.commandBus.execute<UpdateReviseJunctionBoxCommand>(new UpdateReviseJunctionBoxCommand(input));
		return JunctionBoxFactory.CreateJunctionBox(domainReviseJunctionBox);
	}

	@Query((returns) => [JunctionBox], { name: 'spanInstallationJunctionBoxes' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async getSurveyJunctionBoxes(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.junctionBoxService.getJunctionBoxes(surveyId);
	}

	@ResolveField((type) => [SpanMeasure])
	async spanMeasures(@Parent() { id }: SpanMeasure): Promise<SpanMeasure[]> {
		return this.commandBus.execute<FindSpanMeasuresByDecompositionIdCommand>(
			new FindSpanMeasuresByDecompositionIdCommand(id),
		);
	}
}
