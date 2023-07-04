import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';
import { FindSpanMeasureOptionsHandler } from 'src/schema/span-installation/queries/find-span-measure-options.handler';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';
import { SurveyRepository } from '../survey/survey.repository';
import { GetDecompositionItemDamageHandler } from '../span-installation-survey/queries/get-decomposition-item-damage.handler';
import { GetDecompositionItemDamageQuery } from '../span-installation-survey/queries/get-decomposition-item-damage.query';
import { JunctionBoxSurveyService } from '../span-installation-survey/junction-box-survey.service';
import { JunctionBoxSurveyRepository } from '../span-installation-survey/junction-box-survey.repository';
import { FacadeSurveyService } from '../span-installation-survey/facade-survey.service';
import { FacadeSurveyRepository } from '../span-installation-survey/facade-survey.repository';
import { MastSurveyRepository } from '../span-installation-survey/mast-survey.repository';
import { MastSurveyService } from '../span-installation-survey/mast-survey.service';
import { NodeSurveyService } from '../span-installation-survey/node-survey.service';
import { NodeSurveyRepository } from '../span-installation-survey/node-survey.repository';
import { TensionWireSurveyService } from '../span-installation-survey/tension-wire-survey.service';
import { TensionWireSurveyRepository } from '../span-installation-survey/tension-wire-survey.repository';
import { LuminaireSurveyService } from '../span-installation-survey/luminaire-survey.service';
import { LuminaireSurveyRepository } from '../span-installation-survey/luminaire-survey.repository';

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
import { SpanDecompositionItemType } from './types/span-decomposition-item-type';
import { CloneSpanInstallationDecompositionHandler } from './commands/clone-span-installation-decomposition.handler';
import { CloneSpanInstallationDecompositionCommand } from './commands/clone-span-installation-decomposition.command';
import { SpanDecompositionResolver } from './span-decomposition.resolver';
import { FindSpanMeasuresByDecompositionItemIdQuery } from './queries/find-span-measures-by-decomposition-item-id.query';
import { FindSpanMeasuresByDecompositionItemIdHandler } from './queries/find-span-measures-by-decomposition-item-id.handler';
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

registerEnumType(SpanDecompositionItemType, {
	name: 'SpanDecompositionItemType',
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
		FindSpanMeasuresByDecompositionItemIdQuery,
		FindSpanMeasuresByDecompositionItemIdHandler,
		CreateMissingJunctionBoxHandler,
		ReviseJunctionBoxHandler,
		CreateMissingSupportSystemHandler,
		ReviseSupportSystemHandler,
		CreateMissingLuminaireHandler,
		ReviseLuminaireHandler,
		JunctionBoxSurveyService,
		JunctionBoxSurveyRepository,
		FacadeSurveyService,
		FacadeSurveyRepository,
		MastSurveyService,
		MastSurveyRepository,
		NodeSurveyService,
		NodeSurveyRepository,
		TensionWireSurveyService,
		TensionWireSurveyRepository,
		LuminaireSurveyService,
		LuminaireSurveyRepository,
		GetDecompositionItemDamageHandler,
		GetDecompositionItemDamageQuery,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class SpanInstallationModule {}
