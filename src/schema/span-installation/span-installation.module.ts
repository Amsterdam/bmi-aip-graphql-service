import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';
import { FindSpanMeasureOptionsHandler } from 'src/schema/span-installation/queries/find-span-measure-options.handler';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';
import { SurveyRepository } from '../survey/survey.repository';

import { JunctionBoxResolver } from './junction-box-resolver';
import { JunctionBoxService } from './junction-box.service';
import { JunctionBoxRepository } from './junction-box.repository';
import { CreateJunctionBoxHandler } from './commands/create-junction-box.handler';
import { UpdateJunctionBoxHandler } from './commands/update-junction-box.handler';
import { DeleteJunctionBoxHandler } from './commands/delete-junction-box.handler';
import { SupportSystemRepository } from './support-system.repository';
import { SupportSystemResolver } from './support-system.resolver';
import { SupportSystemService } from './support-system.service';
import { DeleteSupportSystemHandler } from './commands/delete-support-system.handler';
import { UpdateSupportSystemHandler } from './commands/update-support-system.handler';
import { CreateSupportSystemHandler } from './commands/create-support-system.handler';
import { CreateLuminaireHandler } from './commands/create-luminaire.handler';
import { UpdateLuminaireHandler } from './commands/update-luminaire.handler';
import { LuminaireResolver } from './luminaire.resolver';
import { LuminaireRepository } from './luminaire.repository';
import { LuminaireService } from './luminaire.service';
import { DeleteLuminaireHandler } from './commands/delete-luminaire.handler';
import { FindSupportSystemsHandler } from './queries/find-support-systems.handler';
import {
	SupportSystemType,
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from './types';
import { FindSupportSystemLuminairesCommand } from './commands/find-support-system-luminaires.command';
import { FindSupportSystemLuminairesHandler } from './commands/find-support-system-luminaires.handler';
import { FindSpanMeasuresHandler } from './queries/find-span-measures.handler';
import { SpanMeasureResolver } from './span-measure.resolver';
import { SpanMeasureOptionResolver } from './span-measure-option.resolver';
import { SpanMeasureService } from './span-measure.service';
import { SpanMeasureRepository } from './span-measure.repository';
import { CreateSpanMeasureHandler } from './commands/create-span-measure.handler';
import { DeleteSpanMeasureHandler } from './commands/delete-span-measure.handler';
import { UpdateSpanMeasureHandler } from './commands/update-span-measure.handler';
import { FindSpanMeasureItemsHandler } from './queries/find-span-measure-items.handler';
import { SpanMeasureItemService } from './span-measure-item.service';
import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { SaveSpanMeasureItemsCommand } from './commands/save-span-measure-items.command';
import { SaveSpanMeasureItemsHandler } from './commands/save-span-measure-items.handler';
import { UpdateSpanMeasureItemsUsedQuantitiesCommand } from './commands/update-span-measure-items-used-quantities.command';
import { UpdateSpanMeasureItemsUsedQuantitiesHandler } from './commands/update-span-measure-items-used-quantities.handler';
import { FindSpanMeasureOptionsQuery } from './queries/find-span-measure-options.query';
import { SpanDecompositionType } from './types/span-decomposition-type';
import { CloneSpanInstallationDecompositionHandler } from './commands/clone-span-installation-decomposition.handler';
import { CloneSpanInstallationDecompositionCommand } from './commands/clone-span-installation-decomposition.command';
import { SpanDecompositionResolver } from './span-decomposition.resolver';
import { FindSpanMeasuresByDecompositionIdCommand } from './commands/find-span-measures-by-decomposition-id.command';
import { FindSpanMeasuresByDecompositionIdHandler } from './commands/find-span-measures-by-decomposition-id.handler';
import { SpanMeasureStatus } from './types/span-measure-status';
import { SpanMeasureItemStatus } from './types/span-measure-item-status';
import { CreateMissingJunctionBoxHandler } from './commands/create-missing-junction-box.handler';
import { ReviseJunctionBoxHandler } from './commands/revise-junction-box.handler';
import { CreateMissingSupportSystemHandler } from './commands/create-missing-support-system.handler';
import { ReviseSupportSystemHandler } from './commands/revise-support-system.handler';
import { CreateMissingLuminaireHandler } from './commands/create-missing-luminaire.handler';
import { ReviseLuminaireHandler } from './commands/revise-luminaire.handler';

registerEnumType(SupportSystemType, {
	name: 'SupportSystemType',
});

registerEnumType(SupportSystemTypeDetailedMast, {
	name: 'SupportSystemTypeDetailedMast',
});

registerEnumType(SupportSystemTypeDetailedFacade, {
	name: 'SupportSystemTypeDetailedFacade',
});

registerEnumType(SupportSystemTypeDetailedNode, {
	name: 'SupportSystemTypeDetailedNode',
});

registerEnumType(SupportSystemTypeDetailedTensionWire, {
	name: 'SupportSystemTypeDetailedTensionWire',
});

registerEnumType(SpanDecompositionType, {
	name: 'SpanDecompositionType',
});

registerEnumType(SpanMeasureStatus, {
	name: 'SpanMeasureStatus',
});

registerEnumType(SpanMeasureItemStatus, {
	name: 'SpanMeasureItemStatus',
});

@Module({
	providers: [
		JunctionBoxResolver,
		JunctionBoxService,
		JunctionBoxRepository,
		CreateJunctionBoxHandler,
		UpdateJunctionBoxHandler,
		DeleteJunctionBoxHandler,
		SupportSystemResolver,
		SupportSystemService,
		SupportSystemRepository,
		CreateSupportSystemHandler,
		UpdateSupportSystemHandler,
		DeleteSupportSystemHandler,
		LuminaireResolver,
		LuminaireService,
		LuminaireRepository,
		CreateLuminaireHandler,
		UpdateLuminaireHandler,
		DeleteLuminaireHandler,
		FindSupportSystemsHandler,
		FindSupportSystemLuminairesCommand,
		FindSupportSystemLuminairesHandler,
		SpanMeasureRepository,
		SpanMeasureResolver,
		SpanMeasureOptionResolver,
		SpanMeasureService,
		FindSpanMeasuresHandler,
		FindSpanMeasureOptionsHandler,
		FindSpanMeasureOptionsQuery,
		CreateSpanMeasureHandler,
		UpdateSpanMeasureHandler,
		DeleteSpanMeasureHandler,
		SpanMeasureItemService,
		FindSpanMeasureItemsHandler,
		SpanMeasureRepository,
		SpanMeasureItemRepository,
		SaveSpanMeasureItemsCommand,
		SaveSpanMeasureItemsHandler,
		UpdateSpanMeasureItemsUsedQuantitiesCommand,
		UpdateSpanMeasureItemsUsedQuantitiesHandler,
		PrismaService,
		SurveyRepository,
		CloneSpanInstallationDecompositionCommand,
		CloneSpanInstallationDecompositionHandler,
		SpanDecompositionResolver,
		FindSpanMeasuresByDecompositionIdCommand,
		FindSpanMeasuresByDecompositionIdHandler,
		CreateMissingJunctionBoxHandler,
		ReviseJunctionBoxHandler,
		CreateMissingSupportSystemHandler,
		ReviseSupportSystemHandler,
		CreateMissingLuminaireHandler,
		ReviseLuminaireHandler,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class SpanInstallationModule {}
