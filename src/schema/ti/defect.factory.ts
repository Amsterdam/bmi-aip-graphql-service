import { Defect } from './models/defect.model';
import { Defect as DomainDefect } from './types/defect.repository.interface';
import { RepairAdviceCategory } from './types';

export class DefectFactory {
	static CreateDefect({
		id,
		conditionId,
		name,
		code,
		description,
		seriousness,
		intensity,
		extend,
		repairAdviceCategory,
		repairDate,
		material,
		cause,
		aspect,
		repairAdvice,
		amount,
		amountTotal,
		measuringUnit,
		measuringUnitAbbreviation,
		score,
		defectType,
		locationDescription,
		details,
		riscLevel,
		ramsR,
		ramsA,
		ramsM,
		ramsS,
		careScore,
		ramsEc,
		ramsEnv,
		ramsTotalPriority,
		ramsWeightedPriority,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainDefect): Defect {
		const defect = new Defect();
		defect.id = id;
		defect.conditionId = conditionId;
		defect.name = name;
		defect.code = code;
		defect.description = description;
		defect.seriousness = seriousness;
		defect.intensity = intensity;
		defect.extend = extend;
		defect.repairAdviceCategory = repairAdviceCategory as RepairAdviceCategory;
		defect.repairDate = repairDate instanceof Date ? repairDate.toUTCString() : null;
		defect.material = material;
		defect.cause = cause;
		defect.aspect = aspect;
		defect.repairAdvice = repairAdvice;
		defect.amount = amount;
		defect.amountTotal = amountTotal;
		defect.measuringUnit = measuringUnit;
		defect.measuringUnitAbbreviation = measuringUnitAbbreviation;
		defect.score = score;
		defect.defectType = defectType;
		defect.locationDescription = locationDescription;
		defect.details = details;
		defect.riskLevel = riscLevel;
		defect.ramsR = ramsR;
		defect.ramsA = ramsA;
		defect.ramsM = ramsM;
		defect.ramsS = ramsS;
		defect.careScore = careScore;
		defect.ramsEc = ramsEc;
		defect.ramsEnv = ramsEnv;
		defect.ramsTotalPriority = ramsTotalPriority;
		defect.ramsWeightedPriority = ramsWeightedPriority;

		defect.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		defect.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;

		return defect;
	}
}
