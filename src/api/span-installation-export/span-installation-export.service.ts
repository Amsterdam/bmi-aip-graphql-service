import { Injectable } from '@nestjs/common';
import { BatchRepository } from 'src/schema/batch/batch.repository';

import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { OVSExportSpanInstallationBaseData } from './types/span-installation';

@Injectable()
export class SpanInstallationExportService {
	public constructor(
		private readonly spanRepository: SpanInstallationExportRepository,
		private readonly batchRepository: BatchRepository,
	) {}

	async getObjectById(objectId: string): Promise<OVSExportSpanInstallationBaseData[]> {
		return this.spanRepository.findByObject(objectId);
	}

	async getObjectsInBatch(batchId: string): Promise<OVSExportSpanInstallationBaseData[]> {
		return this.spanRepository.findByBatch(batchId);
	}

	async getObjectsInAllBatches(): Promise<OVSExportSpanInstallationBaseData[]> {
		const batchDetails = await this.batchRepository.getAllOVSBatches();
		const result: OVSExportSpanInstallationBaseData[] = [];

		for (const batch of batchDetails) {
			const spanInstallations = await this.spanRepository.findByBatch(batch.id);

			result.push(...spanInstallations);
		}

		return result;
	}
}
