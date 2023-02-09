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
import { FindMeasuresQuery } from './queries/find-measures.query';
import { FindMeasuresHandler } from './queries/find-measures.handler';
import { FindCyclicMeasuresQuery } from './queries/find-cyclic-measures.query';
import { FindCyclicMeasuresHandler } from './queries/find-cyclic-measures.handler';
import { CyclicMeasureResolver } from './cyclic-measure.resolver';
import { CyclicMeasureService } from './cyclic-measure.service';
import { CyclicMeasureRepository } from './cyclic-measure.repository';
import { CreateCyclicMeasureHandler } from './commands/create-cyclic-measure.handler';
import { UpdateCyclicMeasureHandler } from './commands/update-cyclic-measure.handler';
import { DeleteCyclicMeasureHandler } from './commands/delete-cyclic-measure.handler';
import { CyclicMeasureTypes } from './types/cyclic-measure';

registerEnumType(MeasureTypes, {
	name: 'MeasureTypes',
});

registerEnumType(QuantityUnitOfMeasurement, {
	name: 'QuantityUnitOfMeasurement',
});

registerEnumType(CyclicMeasureTypes, {
	name: 'CyclicMeasureTypes',
});

@Module({
	providers: [
		PrismaService,

		// Corrective/preventative Measures
		FindMeasuresQuery,
		FindMeasuresHandler,
		MeasureResolver,
		MeasureService,
		MeasureRepository,
		CreateMeasureHandler,
		UpdateMeasureHandler,
		DeleteMeasureHandler,

		// Cyclic Measures
		FindCyclicMeasuresQuery,
		FindCyclicMeasuresHandler,
		CyclicMeasureResolver,
		CyclicMeasureService,
		CyclicMeasureRepository,
		CreateCyclicMeasureHandler,
		UpdateCyclicMeasureHandler,
		DeleteCyclicMeasureHandler,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class MeasureModule {}
