import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { DefaultMaintenanceMeasureService } from './default-maintenance-measure.service';
import { DefaultMaintenanceMeasureRepository } from './default-maintenance-measure.repository';
import { GetDefaultMaintenanceMeasureQuery } from './queries/get-default-maintenance-measure.query';
import { GetDefaultMaintenanceMeasureHandler } from './queries/get-default-maintenance-measure.handler';

@Module({
	providers: [
		GetDefaultMaintenanceMeasureQuery,
		GetDefaultMaintenanceMeasureHandler,
		DefaultMaintenanceMeasureService,
		DefaultMaintenanceMeasureRepository,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
	exports: [DefaultMaintenanceMeasureService],
})
export class DefaultMaintenanceMeasureModule {}
