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
		// copyOfFailureModeId,
		surveyScopeId,
		failureModeType,
		// function,
		guideword,
		failureMode,
		causeOfFailure,
		sourceOfFailure,
		consequenceOfFailure,
		noticableFailure,
	}: CreateFailureModeInput): Promise<FailureMode> {
		const data: Prisma.failureModesCreateInput = {
			id: newId(),
			surveys: { connect: { id: surveyId } },
			elements: { connect: { id: elementId } },
			units: { connect: { id: unitId } },
			manifestations: { connect: { id: manifestationId } },
			customName,
			metaData,
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
			// copyOfFailureModeId,
			surveyScopeId,
			failureModeType,
			dataSets_dataSetsTofailureModes_failureMode: { connect: { id: failureMode } },
			// dataSets_dataSetsTofailureModes_function: { connect: { id: function } },
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

	async updateFailureMode({
		id,
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
		copyOfFailureModeId,
		surveyScopeId,
		failureModeType,
		guideword,
		failureMode,
		causeOfFailure,
		sourceOfFailure,
		consequenceOfFailure,
		noticableFailure,
	}: UpdateFailureModeInput): Promise<FailureMode> {
		const data: Prisma.failureModesUpdateInput = {
			customName,
			metaData,
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
			surveyScopeId,
			failureModeType,
			consequenceOfFailure,
			noticableFailure,
		};

		if (manifestationId) {
			data.manifestations = {
				connect: {
					id: manifestationId,
				},
			};
		}

		if (defaultFailureModeId) {
			data.dataSets_dataSetsTofailureModes_failureMode = {
				connect: {
					id: defaultFailureModeId,
				},
			};
		}
		// copyOfFailureModeId,
		if (guideword) {
			data.dataSets_dataSetsTofailureModes_guideword = {
				connect: {
					id: guideword,
				},
			};
		}

		if (failureMode) {
			data.dataSets_dataSetsTofailureModes_failureMode = {
				connect: {
					id: failureMode,
				},
			};
		}

		if (causeOfFailure) {
			data.dataSets_dataSetsTofailureModes_causeOfFailure = {
				connect: {
					id: causeOfFailure,
				},
			};
		}

		if (sourceOfFailure) {
			data.dataSets_dataSetsTofailureModes_sourceOfFailure = {
				connect: {
					id: sourceOfFailure,
				},
			};
		}

		return this.prisma.failureModes.update({
			where: { id },
			data,
		});
	}
}
