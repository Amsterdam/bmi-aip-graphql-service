import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { FailureMode, IFailureModeRepository } from './types/failure-mode.repository.interface';
import { CreateFailureModeInput } from './dto/create-failure-mode.input';
import { UpdateFailureModeInput } from './dto/update-failure-mode.input';

@Injectable()
export class FailureModeRepository implements IFailureModeRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createFailureMode({
		surveyId,
		elementId,
		unitId,
		manifestationId,
		customName,
		metaData,
		analysisRemarks,
		verificationRemarks,
		maintenanceRemarks,
		created_at,
		updated_at,
		defaultFailureModeId,
		analysisRamsR,
		analysisRamsA,
		analysisRamsS,
		analysisRamsC,
		analysisRamsEc,
		analysisRamsEnv,
		analysisRamsP,
		verificationRamsR,
		verificationRamsA,
		verificationRamsS,
		verificationRamsC,
		verificationRamsEc,
		verificationRamsEnv,
		verificationRamsP,
		maintenanceRamsR,
		maintenanceRamsA,
		maintenanceRamsS,
		maintenanceRamsC,
		maintenanceRamsEc,
		maintenanceRamsEnv,
		maintenanceRamsP,
		analysisRamsTotalPriority,
		verificationRamsTotalPriority,
		maintenanceRamsTotalPriority,
		analysisRamsWeightedPriority,
		verificationRamsWeightedPriority,
		maintenanceRamsWeightedPriority,
		surveyScopeId,
		failureModeType,
		purpose,
		guideword,
		failureMode,
		causeOfFailure,
		sourceOfFailure,
		consequenceOfFailure,
		noticableFailure,
		copyOfFailureModeId,
	}: CreateFailureModeInput): Promise<FailureMode> {
		const data: Prisma.failureModesCreateInput = {
			id: newId(),
			surveys: { connect: { id: surveyId } },
			elements: { connect: { id: elementId } },
			units: { connect: { id: unitId } },
			manifestations: { connect: { id: manifestationId } },
			customName,
			metaData: metaData as Prisma.InputJsonObject,
			analysisRemarks,
			verificationRemarks,
			maintenanceRemarks,
			created_at,
			updated_at,
			defaultFailureModes: { connect: { id: defaultFailureModeId } },
			analysisRamsR,
			analysisRamsA,
			analysisRamsS,
			analysisRamsC,
			analysisRamsEc,
			analysisRamsEnv,
			analysisRamsP,
			verificationRamsR,
			verificationRamsA,
			verificationRamsS,
			verificationRamsC,
			verificationRamsEc,
			verificationRamsEnv,
			verificationRamsP,
			maintenanceRamsR,
			maintenanceRamsA,
			maintenanceRamsS,
			maintenanceRamsC,
			maintenanceRamsEc,
			maintenanceRamsEnv,
			maintenanceRamsP,
			analysisRamsTotalPriority,
			verificationRamsTotalPriority,
			maintenanceRamsTotalPriority,
			analysisRamsWeightedPriority,
			verificationRamsWeightedPriority,
			maintenanceRamsWeightedPriority,
			failureModes: { connect: { id: copyOfFailureModeId } },
			surveyScopeId,
			failureModeType,
			dataSets_dataSetsTofailureModes_failureMode: { connect: { id: failureMode } },
			dataSets_dataSetsTofailureModes_function: { connect: { id: purpose } },
			dataSets_dataSetsTofailureModes_guideword: { connect: { id: guideword } },
			dataSets_dataSetsTofailureModes_causeOfFailure: { connect: { id: causeOfFailure } },
			dataSets_dataSetsTofailureModes_sourceOfFailure: { connect: { id: sourceOfFailure } },
			consequenceOfFailure,
			noticableFailure,
		};

		return this.prisma.failureModes.create({ data });
	}

	async findFailureModes(surveyId: string): Promise<FailureMode[]> {
		return this.prisma.failureModes.findMany({
			where: {
				surveyId,
			},
		});
	}

	public async getFailureMode(failureModeId: string): Promise<FailureMode | null> {
		const failureMode = await this.prisma.failureModes.findUnique({
			where: {
				id: failureModeId,
			},
		});

		if (failureMode) {
			const values = await this.prisma.dataSets.findMany({
				where: {
					id: {
						in: [
							failureMode.failureMode,
							failureMode.function,
							failureMode.guideword,
							failureMode.causeOfFailure,
							failureMode.sourceOfFailure,
						],
					},
				},
			});

			const valueMap = new Map(values.map((value) => [value.id, value.value]));

			failureMode.failureMode = valueMap.get(failureMode.failureMode) || null;
			failureMode.function = valueMap.get(failureMode.function) || null;
			failureMode.guideword = valueMap.get(failureMode.guideword) || null;
			failureMode.causeOfFailure = valueMap.get(failureMode.causeOfFailure) || null;
			failureMode.sourceOfFailure = valueMap.get(failureMode.sourceOfFailure) || null;
		}

		return failureMode;
	}

	async updateFailureMode({
		id,
		customName,
		metaData,
		analysisRemarks,
		verificationRemarks,
		maintenanceRemarks,
		created_at,
		updated_at,
		defaultFailureModeId,
		analysisRamsR,
		analysisRamsA,
		analysisRamsS,
		analysisRamsC,
		analysisRamsEc,
		analysisRamsEnv,
		analysisRamsP,
		verificationRamsR,
		verificationRamsA,
		verificationRamsS,
		verificationRamsC,
		verificationRamsEc,
		verificationRamsEnv,
		verificationRamsP,
		maintenanceRamsR,
		maintenanceRamsA,
		maintenanceRamsS,
		maintenanceRamsC,
		maintenanceRamsEc,
		maintenanceRamsEnv,
		maintenanceRamsP,
		analysisRamsTotalPriority,
		verificationRamsTotalPriority,
		maintenanceRamsTotalPriority,
		analysisRamsWeightedPriority,
		verificationRamsWeightedPriority,
		maintenanceRamsWeightedPriority,
		copyOfFailureModeId,
		surveyScopeId,
		failureModeType,
		purpose,
		guideword,
		failureMode,
		causeOfFailure,
		sourceOfFailure,
		consequenceOfFailure,
		noticableFailure,
	}: UpdateFailureModeInput): Promise<FailureMode> {
		const data: Prisma.failureModesUpdateInput = {
			customName,
			metaData: {
				...metaData,
			},
			analysisRemarks,
			verificationRemarks,
			maintenanceRemarks,
			analysisRamsR,
			analysisRamsA,
			analysisRamsS,
			analysisRamsC,
			analysisRamsEc,
			analysisRamsEnv,
			analysisRamsP,
			verificationRamsR,
			verificationRamsA,
			verificationRamsS,
			verificationRamsC,
			verificationRamsEc,
			verificationRamsEnv,
			verificationRamsP,
			maintenanceRamsR,
			maintenanceRamsA,
			maintenanceRamsS,
			maintenanceRamsC,
			maintenanceRamsEc,
			maintenanceRamsEnv,
			maintenanceRamsP,
			analysisRamsTotalPriority,
			verificationRamsTotalPriority,
			maintenanceRamsTotalPriority,
			analysisRamsWeightedPriority,
			verificationRamsWeightedPriority,
			maintenanceRamsWeightedPriority,
			failureModeType,
			failureModes: { connect: { id: copyOfFailureModeId } },
			dataSets_dataSetsTofailureModes_failureMode: { connect: { id: failureMode } },
			dataSets_dataSetsTofailureModes_function: { connect: { id: purpose } },
			dataSets_dataSetsTofailureModes_guideword: { connect: { id: guideword } },
			dataSets_dataSetsTofailureModes_causeOfFailure: { connect: { id: causeOfFailure } },
			dataSets_dataSetsTofailureModes_sourceOfFailure: { connect: { id: sourceOfFailure } },
			consequenceOfFailure,
			noticableFailure,
		};

		return this.prisma.failureModes.update({
			where: { id },
			data,
		});
	}
}
