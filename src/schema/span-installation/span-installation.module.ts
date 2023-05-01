import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';
import { PrismaService } from '../../prisma.service';

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
import { UpdateSpanMeasureItemsActualsCommand } from './commands/update-span-measure-items-actuals.command';
import { UpdateSpanMeasureItemsActualsHandler } from './commands/update-span-measure-items-actuals.handler';
import { SpanDecompositionType } from './types/span-decomposition-type';

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
		SpanMeasureService,
		FindSpanMeasuresHandler,
		CreateSpanMeasureHandler,
		UpdateSpanMeasureHandler,
		DeleteSpanMeasureHandler,
		SpanMeasureItemService,
		FindSpanMeasureItemsHandler,
		SpanMeasureRepository,
		SpanMeasureItemRepository,
		SaveSpanMeasureItemsCommand,
		SaveSpanMeasureItemsHandler,
		UpdateSpanMeasureItemsActualsCommand,
		UpdateSpanMeasureItemsActualsHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class SpanInstallationModule {}
