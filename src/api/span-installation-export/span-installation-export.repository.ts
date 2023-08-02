import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { IPassport } from '../../schema/asset/models/passport.model';

import { ISpanInstallationExportRepository } from './types/span-installation-export.repository.interface';
import { OVSExportSpanInstallationBaseData } from './types/span-installation';

@Injectable()
export class SpanInstallationExportRepository implements ISpanInstallationExportRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async findSpanInstallations(batchId: string): Promise<OVSExportSpanInstallationBaseData[]> {
		const surveys = await this.prisma.surveys.findMany({
			where: {
				batchId: batchId,
			},
			select: {
				id: true,
				objectId: true,
			},
		});

		const spanInstallations = await this.prisma.objects.findMany({
			where: {
				id: {
					in: surveys.map((survey) => survey.objectId),
				},
			},
			select: {
				id: true,
				name: true,
				code: true,
				location: true,
				latitude: true,
				longitude: true,
				attributes: true,
			},
		});

		const output = spanInstallations.map((spanInstallation) => {
			return {
				...spanInstallation,
				attributes: spanInstallation.attributes as unknown as IPassport,
			};
		});

		return output;
	}
}
