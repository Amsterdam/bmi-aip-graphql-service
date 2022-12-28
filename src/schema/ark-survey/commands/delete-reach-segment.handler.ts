import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReachSegmentRepository } from '../ark-reach-segment.repository';
import { ReachSegment } from '../types/reach-segment.repository.interface';

import { DeleteReachSegmentCommand } from './delete-reach-segment.command';

@CommandHandler(DeleteReachSegmentCommand)
export class DeleteReachSegmentHandler implements ICommandHandler<DeleteReachSegmentCommand> {
	constructor(private repository: ReachSegmentRepository) {}

	public async execute(command: DeleteReachSegmentCommand): Promise<ReachSegment> {
		return this.repository.deleteReachSegment(command.identifier);
	}
}
