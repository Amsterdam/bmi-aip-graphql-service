import { Defect } from '../models/defect.model';
import { Defect as DomainDefect } from '../types/defect.repository.interface';
import { RepairAdviceCategory } from '../types';
import { DefectFactory } from '../defect.factory';

const defect1 = new Defect();
defect1.id = '842cbc36-c28a-5066-c669-6a32af707576';
defect1.name = 'Oppervlakteschade';
defect1.code = 'G-160';
defect1.description = 'Gebreken aan het oppervlak van de materialen waarvan het bouw- of installatiedeel is gemaakt.';
defect1.seriousness = 2;
defect1.intensity = 2;
defect1.extend = 4;
defect1.conditionId = '336e8a0a-5b9e-3af8-8fbf-12b131fb2cdb';
defect1.repairAdviceCategory = RepairAdviceCategory.noRepair;
defect1.repairDate = null;
defect1.material = null;
defect1.cause = null;
defect1.aspect = null;
defect1.repairAdvice = null;
defect1.amount = null;
defect1.amountTotal = null;
defect1.measuringUnit = null;
defect1.measuringUnitAbbreviation = null;
defect1.score = null;
defect1.defectType = null;
defect1.locationDescription = null;
defect1.details = null;
defect1.riskLevel = null;
defect1.ramsR = '1';
defect1.ramsA = '2';
defect1.ramsM = '3';
defect1.ramsS = '2';
defect1.careScore = 1;
defect1.ramsEc = '1';
defect1.ramsEnv = '2';
defect1.ramsTotalPriority = '3';
defect1.ramsWeightedPriority = '1';

export { defect1 };

const defectRaw: Omit<DomainDefect, 'id'> = {
	name: 'Oppervlakteschade',
	code: 'G-160',
	description: 'Gebreken aan het oppervlak van de materialen waarvan het bouw- of installatiedeel is gemaakt.',
	seriousness: 2,
	intensity: 2,
	extend: 4,
	conditionId: '336e8a0a-5b9e-3af8-8fbf-12b131fb2cdb',
	repairAdviceCategory: RepairAdviceCategory.noRepair,
	repairDate: null,
	material: null,
	cause: null,
	aspect: null,
	repairAdvice: null,
	amount: null,
	amountTotal: null,
	measuringUnit: null,
	measuringUnitAbbreviation: null,
	score: null,
	defectType: null,
	locationDescription: null,
	details: null,
	riscLevel: null,
	ramsR: '1',
	ramsA: '2',
	ramsM: '3',
	ramsS: '2',
	careScore: 1,
	ramsEc: '1',
	ramsEnv: '2',
	ramsTotalPriority: '3',
	ramsWeightedPriority: '1',
	created_at: undefined,
	updated_at: undefined,
};

export const domainDefect: DomainDefect = {
	id: '842cbc36-c28a-5066-c669-6a32af707576',
	...defectRaw,
};

export const defect = DefectFactory.CreateDefect(domainDefect);
