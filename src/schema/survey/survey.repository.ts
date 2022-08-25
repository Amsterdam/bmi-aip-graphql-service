import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { ISurveyRepository } from './types/survey.repository.interface';
import { Survey } from './models/survey.model';
import { CreateSurveyInput } from './dto/create-survey.input';

@Injectable()
export class SurveyRepository implements ISurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createSurvey(input: CreateSurveyInput): Promise<Survey> {
		const data: Prisma.surveysCreateInput = {
			id: input.id,
			inspectionStandardType: input.inspectionStandardType,
			objects: {
				connect: {
					id: input.objectId,
				},
			},
			surveryedOn: input.surveryedOn,
			updatedOn: input.updated_at,
		};

		const survey = await this.prisma.surveys.create({ data });
		return this.transformToDto(survey);
	}

	async getSurveyById(surveyId: string): Promise<Survey> {
		const survey = await this.prisma.surveys.findUnique({
			where: { id: surveyId },
		});
		if (!survey) {
			throw new Error('Method not implemented.');
		}

		return this.transformToDto(survey);
	}

	async getSurveysByObjectId(objectId: string): Promise<Survey[]> {
		const surveys = await this.prisma.surveys.findMany({
			where: { objectId: objectId },
		});
		if (!surveys) {
			throw new Error('Method not implemented.');
		}

		const surveyList: Survey[] = [];

		for (const survey of surveys) {
			surveyList.push(this.transformToDto(survey));
		}

		return surveyList;
	}

	public transformToDto(survey) {
		const surveyDto = new Survey();
		surveyDto.id = survey.id;
		surveyDto.objectId = survey.objectId;
		surveyDto.batchId = survey.batchId;
		surveyDto.status = survey.status;
		surveyDto.description = survey.description;
		surveyDto.summaryAndAdvice = survey.summaryAndAdvice;
		surveyDto.condition = survey.condition;
		surveyDto.careCondition = survey.careCondition;
		surveyDto.inspectionStandardType = survey.inspectionStandardType;
		surveyDto.surveryedOn = survey.surveryedOn;
		surveyDto.updatedOn = survey.updatedOn;
		surveyDto.pointCloudStorageUsed = survey.pointCloudStorageUsed;
		surveyDto.craInitialHistoryIsBuildBetween4074 = survey.craInitialHistoryIsBuildBetween4074;
		surveyDto.craInitialHistoryIsBuildBetween4074IsRelevant = survey.craInitialHistoryIsBuildBetween4074IsRelevant;
		surveyDto.craInitialHistoryIsStaticallyIndeterminate = survey.craInitialHistoryIsStaticallyIndeterminate;
		surveyDto.craInitialHistoryIsStaticallyIndeterminateIsRelevant =
			survey.craInitialHistoryIsStaticallyIndeterminateIsRelevant;
		surveyDto.craInitialHistoryBuildBetween4074Remarks = survey.craInitialHistoryBuildBetween4074Remarks;
		surveyDto.craInitialHistoryStaticallyIndeterminateRemarks =
			survey.craInitialHistoryStaticallyIndeterminateRemarks;
		surveyDto.craInspectionIsBuildBetween4074 = survey.craInspectionIsBuildBetween4074;
		surveyDto.craInspectionIsBuildBetween4074IsRelevant = survey.craInspectionIsBuildBetween4074IsRelevant;
		surveyDto.craInspectionIsStaticallyIndeterminate = survey.craInspectionIsStaticallyIndeterminate;
		surveyDto.craInspectionIsStaticallyIndeterminateIsRelevant =
			survey.craInspectionIsStaticallyIndeterminateIsRelevant;
		surveyDto.craInspectionBuildBetween4074Remarks = survey.craInspectionBuildBetween4074Remarks;
		surveyDto.craInspectionStaticallyIndeterminateRemarks = survey.craInspectionStaticallyIndeterminateRemarks;
		surveyDto.craInitialHistoryScore = survey.craInitialHistoryScore;
		surveyDto.craInspectionScore = survey.craInspectionScore;
		surveyDto.craInitialHistoryRemarks = survey.craInitialHistoryRemarks;
		surveyDto.craInspectionRemarks = survey.craInspectionRemarks;
		surveyDto.craInitialHistoryCondition = survey.craInitialHistoryCondition;
		surveyDto.craInspectionCondition = survey.craInspectionCondition;
		surveyDto.craInitialHistoryConditionWithoutFactor = survey.craInitialHistoryConditionWithoutFactor;
		surveyDto.craInspectionConditionWithoutFactor = survey.craInspectionConditionWithoutFactor;
		surveyDto.craInitialHistoryConditionScoreWithoutFactor = survey.craInitialHistoryConditionScoreWithoutFactor;
		surveyDto.craInspectionConditionScoreWithoutFactor = survey.craInspectionConditionScoreWithoutFactor;
		surveyDto.craInitialHistoryConditionScore = survey.craInitialHistoryConditionScore;
		surveyDto.craInspectionConditionScore = survey.craInspectionConditionScore;
		surveyDto.preparedAuthor = survey.preparedAuthor;
		surveyDto.preparedDate = survey.preparedDate;
		surveyDto.verifiedAuthor = survey.verifiedAuthor;
		surveyDto.verifiedDate = survey.verifiedDate;
		surveyDto.isFmecaAvailable = survey.isFmecaAvailable;
		surveyDto.isCraAvailable = survey.isCraAvailable;
		surveyDto.inspectionStandardData = survey.inspectionStandardData;
		surveyDto.legacyFailureMode = survey.legacyFailureMode;
		surveyDto.operatorCompanyId = survey.operatorCompanyId;
		surveyDto.surveyorCompanyId = survey.surveyorCompanyId;
		surveyDto.uri3d = survey.uri3d;
		surveyDto.uriGeo3d = survey.uriGeo3d;
		surveyDto.uriMultiBeam3d = survey.uriMultiBeam3d;
		surveyDto.material = survey.material;
		surveyDto.created_at = survey.created_at;
		surveyDto.updated_at = survey.updated_at;
		return surveyDto;
	}
}
