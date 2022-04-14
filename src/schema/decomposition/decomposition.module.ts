import { Module } from '@nestjs/common';

import { ElementsResolver } from './elements.resolver';
import { ElementsService } from './elements.service';

@Module({
	providers: [ElementsResolver, ElementsService],
})
export class DecompositionModule {}
