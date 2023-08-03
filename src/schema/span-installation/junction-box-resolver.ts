import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { HasDecompositionItemGotDamageQuery } from '../span-installation-survey/queries/has-decomposition-item-got-damage.query';

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
import { FindSpanMeasuresByDecompositionItemIdQuery } from './queries/find-span-measures-by-decomposition-item-id.query';
import { CreateMissingJunctionBoxInput } from './dto/create-missing-junction-box.input';
import { CreateMissingJunctionBoxCommand } from './commands/create-missing-junction-box.command';
import { ReviseJunctionBoxCommand } from './commands/revise-junction-box.command';
import { ReviseJunctionBoxInput } from './dto/revise-junction-box.input';
import { SpanDecompositionItemType } from './types/span-decomposition-item-type';
import { AdditionalPropsForOVSExportModel } from './models/additional-props-for-ovs-export.model';
import { AdditionalPropsForOVSExportInput } from './dto/additional-props-for-ovs-export.input';
import { SetAdditionalPropsForOVSExportCommand } from './commands/set-additional-props-for-ovs-export.command';

@Resolver((of) => JunctionBox)
@Resource(JunctionBox.name)
export class JunctionBoxResolver {
	constructor(
		private junctionBoxService: JunctionBoxService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

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
	public async createMissingJunctionBox(
		@Args('createMissingJunctionBox') input: CreateMissingJunctionBoxInput,
	): Promise<JunctionBox> {
		const domainReviseJunctionBox: DomainJunctionBox =
			await this.commandBus.execute<CreateMissingJunctionBoxCommand>(new CreateMissingJunctionBoxCommand(input));
		return JunctionBoxFactory.CreateJunctionBox(domainReviseJunctionBox);
	}

	@Mutation(() => JunctionBox)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async reviseJunctionBox(@Args('reviseJunctionBox') input: ReviseJunctionBoxInput): Promise<JunctionBox> {
		const domainReviseJunctionBox: DomainJunctionBox = await this.commandBus.execute<ReviseJunctionBoxCommand>(
			new ReviseJunctionBoxCommand(input),
		);
		return JunctionBoxFactory.CreateJunctionBox(domainReviseJunctionBox);
	}

	@Query((returns) => [JunctionBox], { name: 'spanInstallationJunctionBoxes' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async getSurveyJunctionBoxes(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.junctionBoxService.getJunctionBoxes(surveyId);
	}

	@ResolveField((type) => [SpanMeasure])
	async spanMeasures(@Parent() { id }: SpanMeasure): Promise<SpanMeasure[]> {
		return this.queryBus.execute<FindSpanMeasuresByDecompositionItemIdQuery>(
			new FindSpanMeasuresByDecompositionItemIdQuery(id),
		);
	}

	@ResolveField()
	async hasDamage(@Parent() { id }: JunctionBox): Promise<boolean> {
		return this.queryBus.execute<HasDecompositionItemGotDamageQuery>(
			new HasDecompositionItemGotDamageQuery(id, SpanDecompositionItemType.spanJunctionBox),
		);
	}

	// TMP
	@Mutation(() => AdditionalPropsForOVSExportModel)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async setAdditionalPropsForOVSExport(
		@Args('setAdditionalPropsForOVSExport') input: AdditionalPropsForOVSExportInput,
	): Promise<AdditionalPropsForOVSExportModel> {
		const result = await this.commandBus.execute<SetAdditionalPropsForOVSExportCommand>(
			new SetAdditionalPropsForOVSExportCommand(input),
		);
		const response = new AdditionalPropsForOVSExportModel();
		response.success = result;
		return response;
	}
}
