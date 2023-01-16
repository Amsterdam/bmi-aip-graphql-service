import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

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
	constructor(private measureService: MeasureService, private commandBus: CommandBus) {}

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
}
