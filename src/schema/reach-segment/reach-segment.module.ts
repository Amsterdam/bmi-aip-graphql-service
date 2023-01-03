import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaService } from 'src/prisma.service';

import { AssetModule } from '../asset/asset.module';

import { ReachSegmentRepository } from './reach-segment.repository';
import { ReachSegmentResolver } from './reach-segment.resolver';
import { ReachSegmentService } from './reach-segment.service';
import { CreateReachSegmentHandler } from './commands/create-reach-segment.handler';
import { DeleteReachSegmentHandler } from './commands/delete-reach-segment.handler';
import { UpdateReachSegmentHandler } from './commands/update-reach-segment.handler';
import { FindReachSegmentsHandler } from './queries/find-reach-segments.handler';

@Module({
	providers: [
		ReachSegmentResolver,
		ReachSegmentService,
		ReachSegmentRepository,
		CreateReachSegmentHandler,
		UpdateReachSegmentHandler,
		DeleteReachSegmentHandler,
		FindReachSegmentsHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class ReachSegmentModule {}
