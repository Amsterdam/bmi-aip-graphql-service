import { CreateReachSegmentInput } from '../dto/create-reach-segment.input';

export class CreateReachSegmentCommand {
	public constructor(public readonly data: CreateReachSegmentInput) {}
}
