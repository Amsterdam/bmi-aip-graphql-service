import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { NodeSurveyRepository } from '../node-survey.repository';
import { NodeSurvey } from '../models/node-survey.model';

import { CreateNodeSurveyCommand } from './create-node-survey.command';

@CommandHandler(CreateNodeSurveyCommand)
export class CreateNodeSurveyHandler implements ICommandHandler<CreateNodeSurveyCommand> {
	constructor(private repository: NodeSurveyRepository) {}

	public async execute(command: CreateNodeSurveyCommand): Promise<NodeSurvey> {
		return this.repository.createNodeSurvey(command.data);
	}
}
