import { InputType } from '@nestjs/graphql';

import { BaseReachSegmentInput } from './base-reach-segment.input';

@InputType()
export class UpdateReachSegmentInput extends BaseReachSegmentInput {}
