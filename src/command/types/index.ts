export type SetOvsSurveySurveyorsReturnType = {
	done: boolean;
	errors: string[];
	log: string[];
	companyIds: string[];
};

export type MigrateNen2767DecompositionReturnType = {
	errors: string[];
	log: string[];
	successSurveyIds: string[];
	failedSurveyIds: string[];
};
