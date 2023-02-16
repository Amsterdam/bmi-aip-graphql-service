import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';
import { SurveyRepository } from '../survey/survey.repository';
import { UnitRepository } from '../decomposition/unit.repository';
import { ManifestationRepository } from '../decomposition/manifestation.repository';

import { MeasureService } from './measure.service';
import { MeasureResolver } from './measure.resolver';
import { CreateMeasureHandler } from './commands/create-measure.handler';
import { MeasureRepository } from './measure.repository';
import { UpdateMeasureHandler } from './commands/update-measure.handler';
import { DeleteMeasureHandler } from './commands/delete-measure.handler';
import { MeasureTypes, QuantityUnitOfMeasurement } from './types/measure';
import { FindMeasuresHandler } from './queries/find-measures.handler';
import { CloneMeasuresFromPreviousSurveyHandler } from './commands/clone-measures-from-previous-survey.handler';
import { FindCyclicMeasuresHandler } from './queries/find-cyclic-measures.handler';
import { CyclicMeasureResolver } from './cyclic-measure.resolver';
import { CyclicMeasureService } from './cyclic-measure.service';
import { CyclicMeasureRepository } from './cyclic-measure.repository';
import { CreateCyclicMeasureHandler } from './commands/create-cyclic-measure.handler';
import { UpdateCyclicMeasureHandler } from './commands/update-cyclic-measure.handler';
import { DeleteCyclicMeasureHandler } from './commands/delete-cyclic-measure.handler';
import { CyclicMeasureTypes } from './types/cyclic-measure';
import { CalculateMeasureCostHandler } from './queries/calculate-measure-cost.handler';
import { CalculateMeasureCostWithSurchargeHandler } from './queries/calculate-measure-cost-with-surcharge.handler';

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
		FindMeasuresHandler,
		MeasureResolver,
		MeasureService,
		MeasureRepository,
		CreateMeasureHandler,
		UpdateMeasureHandler,
		DeleteMeasureHandler,
		PrismaService,
		SurveyRepository,
		CloneMeasuresFromPreviousSurveyHandler,
		CalculateMeasureCostHandler,
		CalculateMeasureCostWithSurchargeHandler,

		// Cyclic Measures
		FindCyclicMeasuresHandler,
		CyclicMeasureResolver,
		CyclicMeasureService,
		CyclicMeasureRepository,
		CreateCyclicMeasureHandler,
		UpdateCyclicMeasureHandler,
		DeleteCyclicMeasureHandler,
		UnitRepository,
		ManifestationRepository,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class MeasureModule {}
