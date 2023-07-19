import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';

import { PrismaService } from '../prisma.service';

import { SetOvsSurveySurveyorsReturnType } from './types';

@Injectable()
export class SetOvsSurveySurveyorsRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async setOVSSurveySurveyors(): Promise<SetOvsSurveySurveyorsReturnType> {
		const log = [];
		const errors = [];
		const companyIds = [];

		// Find all OVS survey id's based on the survey type
		const surveyIds = await this.prisma.surveys.findMany({
			select: {
				id: true,
				objectId: true,
			},
			where: {
				inspectionStandardType: 'spanInstallation',
			},
		});

		const queue = new PQueue({ concurrency: 5 });

		// Iterate OVS surveys one by one
		surveyIds.forEach((survey) => {
			queue.add(async () => {
				// Destructure objectId and surveyId from the survey record
				const { objectId, id: surveyId } = survey;

				try {
					// Find batch based on objectId
					const object = await this.prisma.objects.findUnique({
						where: {
							id: objectId,
						},
						include: {
							batchObjects: {
								include: {
									batches: {
										include: {
											batchExecutorCompanies: {
												select: {
													companyId: true,
												},
											},
										},
									},
								},
							},
						},
					});

					// If object is in a batch, determine 1st batch executor if configured and
					let companyId;
					if (
						object.batchObjects &&
						object.batchObjects[0] &&
						object.batchObjects[0].batches &&
						object.batchObjects[0].batches.batchExecutorCompanies &&
						object.batchObjects[0].batches.batchExecutorCompanies[0] &&
						object.batchObjects[0].batches.batchExecutorCompanies[0].companyId
					) {
						companyId = object.batchObjects[0].batches.batchExecutorCompanies[0].companyId;
					} else {
						companyId = null;
					}

					// If we did find a batch executor company id, set it on the survey table as the surveyorCompanyId
					if (companyId) {
						await this.prisma.surveys.update({
							where: {
								id: surveyId,
							},
							data: {
								surveyorCompanyId: companyId,
							},
						});
						log.push(`Survey with id ${surveyId} was updated; surveyorCompanyId ${companyId}`);

						if (!companyIds.includes(companyId)) {
							companyIds.push(companyId);
						}
					}
				} catch (err) {
					errors.push(err.message);
				}
			});
		});

		// Wait for all promises to have resolved
		await queue.onIdle();

		return {
			done: true,
			errors,
			log,
			companyIds,
		};
	}
}
