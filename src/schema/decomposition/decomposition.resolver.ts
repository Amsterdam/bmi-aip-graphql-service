import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { Resource } from 'nest-keycloak-connect';

import { Element } from './models/element.model';
import { ElementService } from './element.service';
import { Unit } from './models/unit.model';
import { UnitService } from './unit.service';
import { ManifestationService } from './manifestation.service';
import { CreateDecompositionCommand } from './commands/create-decomposition.command';
import { FindSurveyElementsCommand } from './commands/find-survey-elements.command';
import { FindElementUnitsCommand } from './commands/find-element-units.command';

@Resolver((of) => Element)
@Resource(Element.name)
export class DecompositionResolver {
	constructor(
		private elementService: ElementService,
		private unitService: UnitService,
		private manifestationService: ManifestationService,
		private commandBus: CommandBus,
	) {}

	@Mutation(() => Element)
	public async createDecomposition(
		@Args('assetCode') assetCode: string,
		@Args('surveyId') surveyId: string,
	): Promise<Element[]> {
		await this.commandBus.execute<CreateDecompositionCommand>(new CreateDecompositionCommand(assetCode, surveyId));
		return this.commandBus.execute<FindSurveyElementsCommand>(new FindSurveyElementsCommand(surveyId));
	}

	@ResolveField()
	async units(@Parent() { id }: Element): Promise<Unit[]> {
		return this.commandBus.execute<FindElementUnitsCommand>(new FindElementUnitsCommand(id));
	}

	@Query((returns) => [Element], { name: 'elements' })
	async findSurveyElements(@Args('surveyId', { type: () => String }) surveyId: string): Promise<Element[]> {
		return this.commandBus.execute<FindSurveyElementsCommand>(new FindSurveyElementsCommand(surveyId));
	}
}
