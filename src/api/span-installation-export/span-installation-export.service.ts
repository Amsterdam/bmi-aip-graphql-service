import { Injectable } from '@nestjs/common';
import { BatchRepository } from 'src/schema/batch/batch.repository';

import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { OVSExportSpanInstallationWithBatchDetails } from './types/span-installation';

@Injectable()
export class SpanInstallationExportService {
	public constructor(
		private readonly spanRepository: SpanInstallationExportRepository,
		private readonly batchRepository: BatchRepository,
	) {}

	async getObjectById(objectId: string): Promise<OVSExportSpanInstallationWithBatchDetails[]> {
		// TODO only get objects in batch of type spanInstallation
		// TODO fetching batch details is done in ovs-sheet-service so can be removed here

		const spanInstallations = await this.spanRepository.findByObject(objectId);

		return spanInstallations.map((spanInstallation: OVSExportSpanInstallationWithBatchDetails) => {
			return {
				...spanInstallation,
			};
		});
	}

	async getObjectsInBatch(batchId: string): Promise<OVSExportSpanInstallationWithBatchDetails[]> {
		// TODO only get objects in batch of type spanInstallation
		// TODO fetching batch details is done in ovs-sheet-service so can be removed here

		const batchDetails = await this.batchRepository.getBatchDetails(batchId);
		const spanInstallations = await this.spanRepository.findByBatch(batchId);

		return spanInstallations.map((spanInstallation: OVSExportSpanInstallationWithBatchDetails) => {
			return {
				...spanInstallation,
				batch: batchDetails,
			};
		});
	}

	async getObjectsInAllBatches(): Promise<OVSExportSpanInstallationWithBatchDetails[]> {
		// TODO only get objects in batch of type spanInstallation
		// TODO fetching batch details is done in ovs-sheet-service so can be removed here

		const batchDetails = await this.batchRepository.getAllOVSBatches();
		const result = [];

		for (const batch of batchDetails) {
			let spanInstallations = await this.spanRepository.findByBatch(batch.id);

			spanInstallations = spanInstallations.map((spanInstallation: OVSExportSpanInstallationWithBatchDetails) => {
				return {
					...spanInstallation,
					batch: batch,
				};
			});

			result.push(...spanInstallations);
		}

		return result;
	}
}
