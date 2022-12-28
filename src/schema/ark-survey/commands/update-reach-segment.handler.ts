import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReachSegmentRepository } from '../ark-reach-segment.repository';
import { ReachSegment } from '../types/reach-segment.repository.interface';

import { UpdateReachSegmentCommand } from './update-reach-segment.command';

@CommandHandler(UpdateReachSegmentCommand)
export class UpdateReachSegmentHandler implements ICommandHandler<UpdateReachSegmentCommand> {
	constructor(private repository: ReachSegmentRepository) {}

	public async execute(command: UpdateReachSegmentCommand): Promise<ReachSegment> {
		return this.repository.updateReachSegment(command.data);
	}
}
