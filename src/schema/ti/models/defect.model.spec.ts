import { RepairAdviceCategory } from '../types';

import { Defect } from './defect.model';

describe('TI / Model / JunctionBox', () => {
	test('constructs a Defect instance', () => {
		const defect = new Defect();

		defect.amount = null;
		defect.amountTotal = null;
		defect.aspect = null;
		defect.careScore = 1;
		defect.cause = null;
		defect.code = 'G-160';
		defect.conditionId = '336e8a0a-5b9e-3af8-8fbf-12b131fb2cdb';
		defect.createdAt = null;
		defect.defectType = null;
		defect.description =
			'Gebreken aan het oppervlak van de materialen waarvan het bouw- of installatiedeel is gemaakt.';
		defect.details = null;
		defect.extend = 4;
		defect.id = '842cbc36-c28a-5066-c669-6a32af707576';
		defect.intensity = 2;
		defect.locationDescription = null;
		defect.material = null;
		defect.measuringUnit = null;
		defect.measuringUnitAbbreviation = null;
		defect.name = 'Oppervlakteschade';
		defect.ramsA = '2';
		defect.ramsEc = '1';
		defect.ramsEnv = '2';
		defect.ramsM = '3';
		defect.ramsR = '1';
		defect.ramsS = '2';
		defect.ramsTotalPriority = '3';
		defect.ramsWeightedPriority = '1';
		defect.repairAdvice = null;
		defect.repairAdviceCategory = RepairAdviceCategory.noRepair;
		defect.repairDate = null;
		defect.riskLevel = null;
		defect.score = null;
		defect.seriousness = 2;
		defect.updatedAt = null;

		expect(defect).toEqual({
			amount: null,
			amountTotal: null,
			aspect: null,
			careScore: 1,
			cause: null,
			code: 'G-160',
			conditionId: '336e8a0a-5b9e-3af8-8fbf-12b131fb2cdb',
			createdAt: null,
			defectType: null,
			description:
				'Gebreken aan het oppervlak van de materialen waarvan het bouw- of installatiedeel is gemaakt.',
			details: null,
			extend: 4,
			id: '842cbc36-c28a-5066-c669-6a32af707576',
			intensity: 2,
			locationDescription: null,
			material: null,
			measuringUnit: null,
			measuringUnitAbbreviation: null,
			name: 'Oppervlakteschade',
			ramsA: '2',
			ramsEc: '1',
			ramsEnv: '2',
			ramsM: '3',
			ramsR: '1',
			ramsS: '2',
			ramsTotalPriority: '3',
			ramsWeightedPriority: '1',
			repairAdvice: null,
			repairAdviceCategory: 'noRepair',
			repairDate: null,
			riskLevel: null,
			score: null,
			seriousness: 2,
			updatedAt: null,
		});
	});
});
