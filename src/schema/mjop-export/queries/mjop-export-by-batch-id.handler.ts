import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import * as ExcelJS from 'exceljs';
import { Worksheet } from 'exceljs';
import { Logger } from '@nestjs/common';

import { InspectionStandard } from '../../survey/types';
import { SurveyService } from '../../survey/survey.service';
import { Survey } from '../../survey/models/survey.model';
import { AddMJOPSheetService } from '../add-mjop-sheet.service';

import { MJOPExportByBatchIdQuery } from './mjop-export-by-batch-id.query';

@QueryHandler(MJOPExportByBatchIdQuery)
export class MJOPExportByBatchIdHandler implements IQueryHandler<MJOPExportByBatchIdQuery> {
	constructor(
		private surveyService: SurveyService,
		private readonly addMjopSheetService: AddMJOPSheetService,
		private readonly logger: Logger,
	) {}

	async execute(query: MJOPExportByBatchIdQuery) {
		const isFmeca = query.inspectionStandardType === InspectionStandard.fmeca;

		const workbook = new Promise<ExcelJS.Workbook>((resolve) => {
			const wb = new ExcelJS.Workbook();
			resolve(wb);
		});

		try {
			const generatedWorkbook = await workbook;
			const worksheet: Worksheet = generatedWorkbook.addWorksheet('MJOP', {
				views: [{ state: 'frozen', ySplit: 1, xSplit: 1 }],
			});
			const surveys: Survey[] = await this.surveyService.getSurveysByBatchId(
				query.batchId,
				query.inspectionStandardType,
			);
			let generateHeaders = true;
			for (const survey of surveys) {
				await this.addMjopSheetService.addMJOPSheet(worksheet, survey, isFmeca, generateHeaders);
				generateHeaders = false;
			}
			const fileName = `MJOP_Batch_Report_${new Date().toISOString()}.xlsx`;
			query.response.setHeader(
				'Content-Type',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			);
			query.response.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
			query.response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
			await generatedWorkbook.xlsx.write(query.response);
			return query.response.end();
		} catch (err) {
			this.logger.error('Error:', err);
			query.response.status(500).send({});
		}
	}
}
