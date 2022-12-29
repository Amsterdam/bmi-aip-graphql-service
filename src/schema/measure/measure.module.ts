import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { MeasureService } from './measure.service';
import { MeasureResolver } from './measure.resolver';
import { CreateMeasureHandler } from './commands/create-measure.handler';
import { MeasureRepository } from './measure.repository';
import { UpdateMeasureHandler } from './commands/update-measure.handler';
import { DeleteMeasureHandler } from './commands/delete-measure.handler';
import { MeasureTypes, QuantityUnitOfMeasurement } from './types/measure';

registerEnumType(MeasureTypes, {
	name: 'MeasureTypes',
});

registerEnumType(QuantityUnitOfMeasurement, {
	name: 'QuantityUnitOfMeasurement',
});

@Module({
	providers: [
		MeasureResolver,
		MeasureService,
		MeasureRepository,
		CreateMeasureHandler,
		UpdateMeasureHandler,
		DeleteMeasureHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class MeasureModule {}
