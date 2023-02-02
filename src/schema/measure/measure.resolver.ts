import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { Survey } from '../survey/models/survey.model';
import { GetSurveyByIdQuery } from '../survey/queries/get-survey-by-id.query';
import { Unit } from '../decomposition/models/unit.model';
import { GetUnitByIdQuery } from '../decomposition/queries/get-unit-by-id.query';
import { Defect } from '../ti/models/defect.model';
import { GetDefectQuery } from '../ti/queries/get-defect.query';
import { FailureMode } from '../failure-mode/models/failure-mode.model';
import { GetFailureModeByIdQuery } from '../failure-mode/queries/get-failure-mode-by-id.query';
import { GetManifestationByIdQuery } from '../decomposition/queries/get-manifestation-by-id.query';
import { Manifestation } from '../decomposition/models/manifestation.model';

import { Measure } from './models/measure.model';
import { MeasureFactory } from './measure.factory';
import { MeasureService } from './measure.service';
import { CreateMeasureInput } from './dto/create-measure.input';
import { UpdateMeasureInput } from './dto/update-measure.input';
import { CreateMeasureCommand } from './commands/create-measure.command';
import { UpdateMeasureCommand } from './commands/update-measure.command';
import { Measure as DomainMeasure } from './types/measure.repository.interface';
import { DeleteMeasureCommand } from './commands/delete-measure.command';

@Resolver((of) => Measure)
@Resource(Measure.name)
export class MeasureResolver {
	constructor(private measureService: MeasureService, private commandBus: CommandBus, private queryBus: QueryBus) {}

	@Mutation(() => Measure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createMeasure(@Args('createMeasure') input: CreateMeasureInput): Promise<Measure> {
		const domainMeasure: DomainMeasure = await this.commandBus.execute<CreateMeasureCommand>(
			new CreateMeasureCommand(input),
		);
		return MeasureFactory.CreateMeasure(domainMeasure);
	}

	@Mutation(() => Measure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateMeasure(@Args('updateMeasure') input: UpdateMeasureInput): Promise<Measure> {
		const domainMeasure: DomainMeasure = await this.commandBus.execute<UpdateMeasureCommand>(
			new UpdateMeasureCommand(input),
		);
		return MeasureFactory.CreateMeasure(domainMeasure);
	}

	@Mutation(() => Measure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async deleteMeasure(@Args('identifier') identifier: string): Promise<Measure> {
		const domainMeasure: DomainMeasure = await this.commandBus.execute<DeleteMeasureCommand>(
			new DeleteMeasureCommand(identifier),
		);
		return MeasureFactory.CreateMeasure(domainMeasure);
	}

	@Query((returns) => [Measure], { name: 'measures' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	async getSurveyMeasures(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.measureService.findMeasures(surveyId);
	}

	@ResolveField()
	survey(@Parent() { surveyId }: Measure): Promise<Survey> {
		return this.queryBus.execute<GetSurveyByIdQuery>(new GetSurveyByIdQuery(surveyId));
	}

	@ResolveField()
	unit(@Parent() { unitId }: Measure): Promise<Unit> {
		return this.queryBus.execute<GetUnitByIdQuery>(new GetUnitByIdQuery(unitId));
	}

	@ResolveField()
	manifestation(@Parent() { manifestationId }: Measure): Promise<Manifestation> {
		return this.queryBus.execute<GetManifestationByIdQuery>(new GetManifestationByIdQuery(manifestationId));
	}

	@ResolveField()
	defect(@Parent() { defectId }: Measure): Promise<Defect> {
		return this.queryBus.execute<GetDefectQuery>(new GetDefectQuery(defectId));
	}

	@ResolveField()
	failureMode(@Parent() { failureModeId }: Measure): Promise<FailureMode> {
		return this.queryBus.execute<GetFailureModeByIdQuery>(new GetFailureModeByIdQuery(failureModeId));
	}
}
