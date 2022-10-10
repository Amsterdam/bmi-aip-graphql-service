import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { NodeSurveyRepository } from '../node-survey.repository';
import { NodeSurvey } from '../models/node-survey.model';

import { UpdateNodeSurveyCommand } from './update-node-survey.command';

@CommandHandler(UpdateNodeSurveyCommand)
export class UpdateNodeSurveyHandler implements ICommandHandler<UpdateNodeSurveyCommand> {
	constructor(private repository: NodeSurveyRepository) {}

	public async execute(command: UpdateNodeSurveyCommand): Promise<NodeSurvey> {
		return this.repository.updateNodeSurvey(command.data);
	}
}
