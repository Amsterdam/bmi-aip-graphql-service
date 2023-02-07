import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Survey } from '../survey/models/survey.model';
import { GetSurveyByIdQuery } from '../survey/queries/get-survey-by-id.query';
import { Unit } from '../decomposition/models/unit.model';
import { GetUnitByIdQuery } from '../decomposition/queries/get-unit-by-id.query';
import { GetDefectQuery } from '../ti/queries/get-defect.query';
import { GetFailureModeByIdQuery } from '../failure-mode/queries/get-failure-mode-by-id.query';
import { Defect } from '../ti/models/defect.model';
import { FailureMode } from '../failure-mode/models/failure-mode.model';
import { DefaultMaintenanceMeasure } from '../default-maintenance-measure/models/default-maintenance-measure.model';
import { GetDefaultMaintenanceMeasureQuery } from '../default-maintenance-measure/queries/get-default-maintenance-measure.query';

import { CyclicMeasure } from './models/cyclic-measure.model';
import { CyclicMeasureFactory } from './cyclic-measure.factory';
import { CyclicMeasureService } from './cyclic-measure.service';
import { CreateCyclicMeasureInput } from './dto/create-cyclic-measure.input';
import { UpdateCyclicMeasureInput } from './dto/update-cyclic-measure.input';
import { CreateCyclicMeasureCommand } from './commands/create-cyclic-measure.command';
import { UpdateCyclicMeasureCommand } from './commands/update-cyclic-measure.command';
import { CyclicMeasure as DomainCyclicMeasure } from './types/cyclic-measure.repository.interface';
import { DeleteCyclicMeasureCommand } from './commands/delete-cyclic-measure.command';

@Resolver((of) => CyclicMeasure)
@Resource(CyclicMeasure.name)
export class CyclicMeasureResolver {
	constructor(
		private cyclicMeasureService: CyclicMeasureService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => CyclicMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createCyclicMeasure(
		@Args('createCyclicMeasure') input: CreateCyclicMeasureInput,
	): Promise<CyclicMeasure> {
		const domainCyclicMeasure: DomainCyclicMeasure = await this.commandBus.execute<CreateCyclicMeasureCommand>(
			new CreateCyclicMeasureCommand(input),
		);
		return CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);
	}

	@Mutation(() => CyclicMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateCyclicMeasure(
		@Args('updateCyclicMeasure') input: UpdateCyclicMeasureInput,
	): Promise<CyclicMeasure> {
		const domainCyclicMeasure: DomainCyclicMeasure = await this.commandBus.execute<UpdateCyclicMeasureCommand>(
			new UpdateCyclicMeasureCommand(input),
		);
		return CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);
	}

	@Mutation(() => CyclicMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async deleteCyclicMeasure(@Args('identifier') identifier: string): Promise<CyclicMeasure> {
		const domainCyclicMeasure: DomainCyclicMeasure = await this.commandBus.execute<DeleteCyclicMeasureCommand>(
			new DeleteCyclicMeasureCommand(identifier),
		);
		return CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);
	}

	@Query((returns) => [CyclicMeasure], { name: 'cyclicMeasures' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	async getSurveyCyclicMeasures(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.cyclicMeasureService.findCyclicMeasures(surveyId);
	}

	@ResolveField()
	survey(@Parent() { surveyId }: CyclicMeasure): Promise<Survey> {
		return this.queryBus.execute<GetSurveyByIdQuery>(new GetSurveyByIdQuery(surveyId));
	}

	@ResolveField()
	unit(@Parent() { unitId }: CyclicMeasure): Promise<Unit> {
		return this.queryBus.execute<GetUnitByIdQuery>(new GetUnitByIdQuery(unitId));
	}

	@ResolveField()
	defect(@Parent() { defectId }: CyclicMeasure): Promise<Defect> {
		return this.queryBus.execute<GetDefectQuery>(new GetDefectQuery(defectId));
	}

	@ResolveField()
	failureMode(@Parent() { failureModeId }: CyclicMeasure): Promise<FailureMode> {
		return this.queryBus.execute<GetFailureModeByIdQuery>(new GetFailureModeByIdQuery(failureModeId));
	}

	@ResolveField()
	defaultMaintenanceMeasure(
		@Parent() { defaultMaintenanceMeasureId }: CyclicMeasure,
	): Promise<DefaultMaintenanceMeasure> {
		return this.queryBus.execute<GetDefaultMaintenanceMeasureQuery>(
			new GetDefaultMaintenanceMeasureQuery(defaultMaintenanceMeasureId),
		);
	}
}
