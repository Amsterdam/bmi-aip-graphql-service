import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';
import { SurveyRepository } from '../survey/survey.repository';

import { MeasureService } from './measure.service';
import { MeasureResolver } from './measure.resolver';
import { CreateMeasureHandler } from './commands/create-measure.handler';
import { MeasureRepository } from './measure.repository';
import { UpdateMeasureHandler } from './commands/update-measure.handler';
import { DeleteMeasureHandler } from './commands/delete-measure.handler';
import { MeasureTypes, QuantityUnitOfMeasurement } from './types/measure';
import { FindMeasuresQuery } from './queries/find-measures.query';
import { FindMeasuresHandler } from './queries/find-measures.handler';
import { CloneMeasuresFromPreviousSurveyHandler } from './commands/clone-measures-from-previous-survey.handler';

registerEnumType(MeasureTypes, {
	name: 'MeasureTypes',
});

registerEnumType(QuantityUnitOfMeasurement, {
	name: 'QuantityUnitOfMeasurement',
});

@Module({
	providers: [
		FindMeasuresQuery,
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
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class MeasureModule {}
