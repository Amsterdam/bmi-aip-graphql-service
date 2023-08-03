import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import * as ExcelJS from 'exceljs';
import { Worksheet } from 'exceljs';
import { Logger } from '@nestjs/common';

import { InspectionStandard } from '../../survey/types';
import { SurveyService } from '../../survey/survey.service';
import { AddMJOPSheetService } from '../add-mjop-sheet.service';
import { ObjectService } from '../../object/object.service';

import { MJOPExportByObjectIdQuery } from './mjop-export-by-object-id.query';

@QueryHandler(MJOPExportByObjectIdQuery)
export class MJOPExportByObjectIdHandler implements IQueryHandler<MJOPExportByObjectIdQuery> {
	constructor(
		private surveyService: SurveyService,
		private objectService: ObjectService,
		private readonly addMjopSheetService: AddMJOPSheetService,
		private readonly logger: Logger,
	) {}

	async execute(query: MJOPExportByObjectIdQuery) {
		const survey = await this.surveyService.getNen2767OrFmecaSurveyByObjectId(query.objectId);
		const objectCode = await this.objectService.getObjectCodeOtherwiseNameById(survey.objectId);

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
			const worksheet: Worksheet = generatedWorkbook.addWorksheet('MJOP', {
				views: [{ state: 'frozen', ySplit: 1, xSplit: 1 }],
			});

			await this.addMjopSheetService.addMJOPSheet(worksheet, survey, isFmeca, true);
			const fileName = `MJOP_Report_${objectCode}_${new Date().toISOString()}.xlsx`;
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
