import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReachSegment } from '../types/reach-segment.repository.interface';
import { ReachSegmentRepository } from '../reach-segment.repository';

import { CreateReachSegmentCommand } from './create-reach-segment.command';

@CommandHandler(CreateReachSegmentCommand)
export class CreateReachSegmentHandler implements ICommandHandler<CreateReachSegmentCommand> {
	constructor(private repository: ReachSegmentRepository) {}

	public async execute(command: CreateReachSegmentCommand): Promise<ReachSegment> {
		return this.repository.createReachSegment(command.data);
	}
}
