import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import * as ExcelJS from 'exceljs';

import { InspectionStandard } from '../../survey/types';
import { SurveyService } from '../../survey/survey.service';
import { AddMjopSheetService } from '../mjop-report-survey/add-mjop-sheet.service';

import { MjopExportBySurveyIdQuery } from './mjop-export-by-survey-id.query';

@QueryHandler(MjopExportBySurveyIdQuery)
export class MjopExportBySurveyIdHandler implements IQueryHandler<MjopExportBySurveyIdQuery> {
	constructor(private surveyService: SurveyService, private readonly addMjopSheetService: AddMjopSheetService) {}

	async execute(query: MjopExportBySurveyIdQuery) {
		const survey = await this.surveyService.getSurvey(query.surveyId);

		if (
			survey.inspectionStandardType !== InspectionStandard.nen2767 &&
			survey.inspectionStandardType !== InspectionStandard.fmeca
		) {
			return query.response.status(500).send({ code: 'UNKNOWN_TYPE:' + survey.inspectionStandardType });
		}

		const isFmeca = survey.inspectionStandardType === InspectionStandard.fmeca;

		const workbook = new Promise<ExcelJS.Workbook>((resolve) => {
			const wb = new ExcelJS.Workbook();
			resolve(wb);
		});

		try {
			const generatedWorkbook = await workbook;

			await this.addMjopSheetService.addMJOPSheet(generatedWorkbook, survey, isFmeca);
			const fileName = 'MJOP_Report.xlsx';
			query.response.setHeader(
				'Content-Type',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			);
			query.response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
			await generatedWorkbook.xlsx.write(query.response);
			return query.response.end();
		} catch (err) {
			console.error(err);
			query.response.status(500).send({});
		}
	}
}
