import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ElementService } from '../element.service';
import { Element } from '../models/element.model';

import { FindSurveyElementsCommand } from './find-survey-elements.command';

@CommandHandler(FindSurveyElementsCommand)
export class FindSurveyElementsHandler implements ICommandHandler<FindSurveyElementsCommand> {
	constructor(private service: ElementService) {}

	public async execute({ surveyId }: FindSurveyElementsCommand): Promise<Element[]> {
		return this.service.getElements(surveyId);
	}
}
