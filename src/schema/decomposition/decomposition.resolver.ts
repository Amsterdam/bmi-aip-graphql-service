import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { Element } from './models/element.model';
import { ElementService } from './element.service';
import { UnitService } from './unit.service';
import { CreateDecompositionCommand } from './commands/create-decomposition.command';
import { FindSurveyElementsCommand } from './commands/find-survey-elements.command';
import { CloneDecompositionFromPreviousSurveyCommand } from './commands/clone-decomposition-from-previous-survey.command';

@Resolver((of) => Element)
@Resource(Element.name)
export class DecompositionResolver {
	constructor(
		private elementService: ElementService,
		private unitService: UnitService,
		private commandBus: CommandBus,
	) {}

	@Mutation(() => Element)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createDecomposition(
		@Args('assetCode') assetCode: string,
		@Args('surveyId') surveyId: string,
	): Promise<Element[]> {
		await this.commandBus.execute<CreateDecompositionCommand>(new CreateDecompositionCommand(assetCode, surveyId));
		return this.commandBus.execute<FindSurveyElementsCommand>(new FindSurveyElementsCommand(surveyId));
	}

	@Mutation((returns) => [Element])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async cloneDecompositionFromPreviousSurvey(
		@Args('surveyId', { type: () => String }) surveyId: string,
	): Promise<Element[]> {
		return this.commandBus.execute<CloneDecompositionFromPreviousSurveyCommand>(
			new CloneDecompositionFromPreviousSurveyCommand(surveyId),
		);
	}
}
