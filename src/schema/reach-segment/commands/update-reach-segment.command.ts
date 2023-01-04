import { UpdateReachSegmentInput } from '../dto/update-reach-segment.input';

export class UpdateReachSegmentCommand {
	public constructor(public readonly data: UpdateReachSegmentInput) {}
}
