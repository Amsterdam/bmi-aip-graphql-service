import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';
import { SurveyRepository } from '../survey/survey.repository';
import { MeasureModule } from '../measure/measure.module';

import { ElementService } from './element.service';
import { ElementResolver } from './element.resolver';
import { ManifestationResolver } from './manifestation.resolver';
import { CreateManifestationHandler } from './commands/create-manifestation.handler';
import { ManifestationRepository } from './manifestation.repository';
import { ManifestationService } from './manifestation.service';
import { UnitResolver } from './unit.resolver';
import { CreateUnitHandler } from './commands/create-unit.handler';
import { UnitRepository } from './unit.repository';
import { UnitService } from './unit.service';
import { CreateElementHandler } from './commands/create-element.handler';
import { ElementRepository } from './element.repository';
import { UpdateElementHandler } from './commands/update-element.handler';
import { UpdateManifestationHandler } from './commands/update-manifestation.handler';
import { UpdateUnitHandler } from './commands/update-unit.handler';
import { DeleteElementHandler } from './commands/delete-element.handler';
import { DeleteUnitHandler } from './commands/delete-unit.handler';
import { DeleteManifestationHandler } from './commands/delete-manifestation.handler';
import { DecompositionResolver } from './decomposition.resolver';
import { FindSurveyElementsHandler } from './commands/find-survey-elements.handler';
import { FindElementUnitsHandler } from './commands/find-element-units.handler';
import { FindUnitManifestationsHandler } from './commands/find-unit-manifestations.handler';
import { CloneDecompositionFromPreviousSurveyHandler } from './commands/clone-decomposition-from-previous-survey.handler';
import { DecompositionRepository } from './decomposition.repository';
import { GetUnitByIdQuery } from './queries/get-unit-by-id.query';
import { GetUnitByIdHandler } from './queries/get-unit-by-id.handler';
import { GetElementByIdQuery } from './queries/get-element-by-id.query';
import { GetElementByIdHandler } from './queries/get-element-by-id.handler';
import { GetManifestationByIdQuery } from './queries/get-manifestation-by-id.query';
import { GetManifestationByIdHandler } from './queries/get-manifestation-by-id.handler';
import { ObjectTypeUnitCodeRepository } from './object-type-unit-code.repository';

@Module({
	providers: [
		ElementResolver,
		ElementService,
		ElementRepository,
		UnitResolver,
		UnitRepository,
		UnitService,
		ManifestationResolver,
		ManifestationRepository,
		ManifestationService,
		CreateElementHandler,
		CreateUnitHandler,
		CreateManifestationHandler,
		UpdateElementHandler,
		UpdateUnitHandler,
		UpdateManifestationHandler,
		DeleteElementHandler,
		DeleteUnitHandler,
		DeleteManifestationHandler,
		PrismaService,
		DecompositionResolver,
		FindSurveyElementsHandler,
		FindElementUnitsHandler,
		FindUnitManifestationsHandler,
		DecompositionRepository,
		CloneDecompositionFromPreviousSurveyHandler,
		GetElementByIdQuery,
		GetElementByIdHandler,
		GetUnitByIdQuery,
		GetUnitByIdHandler,
		GetManifestationByIdQuery,
		GetManifestationByIdHandler,
		SurveyRepository,
		ObjectTypeUnitCodeRepository,
	],
	imports: [
		CqrsModule,
		AuthorizationModule,
		AuthenticationModule,
		forwardRef(() => MeasureModule),
		forwardRef(() => AssetModule),
	],
	exports: [UnitService, UnitRepository, ObjectTypeUnitCodeRepository, ElementService],
})
export class DecompositionModule {}
