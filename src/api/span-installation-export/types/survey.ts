export type SurveyMastData = {
	surveyMastDamage: boolean | null;
	surveyMastMissingParts: boolean | null;
	surveyTensionMastAngle: number | null;
	surveyMastAttachmentDamage: boolean | null;
	surveyMastBracketMissingParts: boolean | null;
	surveyMastBracketDamage: boolean | null;
	surveyMastImagery: number | null;
	surveyMastRemarks: string | null;
};

export type SurveyNodeData = {
	surveyNodeDamage: boolean | null;
	surveyNodeImagery: number | null;
	surveyNodeRemarks: string | null;
};
