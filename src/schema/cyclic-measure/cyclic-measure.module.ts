import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';
import { QuantityUnitOfMeasurement } from '../measure/types/measure';

import { CyclicMeasureService } from './cyclic-measure.service';
import { CyclicMeasureResolver } from './cyclic-measure.resolver';
import { CreateCyclicMeasureHandler } from './commands/create-cyclic-measure.handler';
import { CyclicMeasureRepository } from './cyclic-measure.repository';
import { UpdateCyclicMeasureHandler } from './commands/update-cyclic-measure.handler';
import { DeleteCyclicMeasureHandler } from './commands/delete-cyclic-measure.handler';
import { CyclicMeasureTypes } from './types/cyclic-measure';
import { GetCyclicMeasuresQuery } from './queries/get-cyclic-measures.query';
import { GetCyclicMeasuresHandler } from './queries/get-cyclic-measures.handler';

registerEnumType(CyclicMeasureTypes, {
	name: 'CyclicMeasureTypes',
});

registerEnumType(QuantityUnitOfMeasurement, {
	name: 'QuantityUnitOfMeasurement',
});

@Module({
	providers: [
		GetCyclicMeasuresQuery,
		GetCyclicMeasuresHandler,
		CyclicMeasureResolver,
		CyclicMeasureService,
		CyclicMeasureRepository,
		CreateCyclicMeasureHandler,
		UpdateCyclicMeasureHandler,
		DeleteCyclicMeasureHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class CyclicMeasureModule {}
