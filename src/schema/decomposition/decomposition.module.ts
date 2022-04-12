import { Module } from '@nestjs/common';

import { ElementsResolver } from './elements.resolver';
import { ElementsService } from './elements.service';
import { ElementsController } from './elements.controller';
// import { AuthenticationModule } from '../../authentication/authentication.module';

@Module({
	// imports: [AuthenticationModule],
	providers: [ElementsResolver, ElementsService],
	controllers: [ElementsController],
})
export class DecompositionModule {}
