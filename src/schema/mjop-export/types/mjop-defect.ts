export interface IMJOPDefect {
	defectName: string; // Schadebeeld
	seriousness: number;
	intensity: number;
	extend: number;
	repairAdvice: string; // Herstel advies
	defectScore: number; // Conditiescore Gebrek
	defectCareScore: number; // Verzorgingsscore Gebrek
	ramsR: string; // ramsR
	ramsA: string; // ramsA
	ramsS: string; // ramsS
	ramsEc: string; // ramsEc
	ramsEnv: string; // ramsEnv
	ramsWeightedPriority: string;
	ramsTotalPriority: string; // Prioritering
}
