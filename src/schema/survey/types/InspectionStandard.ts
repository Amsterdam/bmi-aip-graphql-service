import { Survey } from './../models/survey.model';

export enum InspectionStandard {
	free = 'free',
	nen2767 = 'nen2767',
	eemua159 = 'eemua159',
	api653 = 'api653',
	fmeca = 'fmeca',
	memo = 'memo',
	model3d = 'model3d',
	amsterdamBridgePoles = 'amsterdamBridgePoles',
	monitoring = 'monitoring',
	sok = 'sok',
	quaywalls = 'quaywalls',
	verificatieBerekening = 'verificatieBerekening',
	spanInstallation = 'spanInstallation',
	facadeFollowUpSurvey = 'facadeFollowUpSurvey',
	spanMeasuresSurvey = 'spanMeasuresSurvey',
}

export function getSurveyInspectionType(inspectionStandardType: Survey['inspectionStandardType']): InspectionStandard {
	switch (inspectionStandardType) {
		case 'fmeca':
			return InspectionStandard.fmeca;
		case 'nen2767':
			return InspectionStandard.nen2767;
		case 'monitoring':
			return InspectionStandard.monitoring;
		case 'memo':
			return InspectionStandard.memo;
		case 'sok':
			return InspectionStandard.sok;
		case 'spanInstallation':
			return InspectionStandard.spanInstallation;
		case 'facadeFollowUpSurvey':
			return InspectionStandard.facadeFollowUpSurvey;
		case 'spanMeasuresSurvey':
			return InspectionStandard.spanMeasuresSurvey;
		default:
			return InspectionStandard.fmeca;
	}
}
