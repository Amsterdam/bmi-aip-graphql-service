export type SurveyFacadeData = {
	surveyFacadeDamageWithin1m: boolean | null;
	surveyFacadeHinderingVegetation: boolean | null;
	surveyFacadeWallPlateDamage: boolean | null;
	surveyFacadeFaultyMontage: boolean | null;
	surveyFacadeNutNotFullyOverThreadedRod: boolean | null;
	surveyFacadeMissingFasteners: boolean | null;
	surveyFacadeMeasuredPreload: number | null;
	surveyFacadeAppliedAdditionalTraction: number | null;
	surveyFacadeConnectionFailed: boolean | null;
	surveyFacadeConnectionFailureAdditionalTraction: number | null;
	surveyFacadeImagery: number | null;
	surveyFacadeRemarks: string | null;
};

export type SurveyJunctionBoxData = {
	surveyJunctionBoxCableDamage: boolean | null;
	surveyJunctionBoxFaultyMontageTensionWire: boolean | null;
	surveyJunctionBoxFaultyMontageFacade: boolean | null;
	surveyJunctionBoxDamage: boolean | null;
	surveyJunctionBoxStickerNotReadable: boolean | null;
	surveyJunctionBoxImagery: number | null;
	surveyJunctionBoxRemarks: string | null;
};

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

export type SurveyTensionWireData = {
	surveyTensionWireDamage: boolean | null;
	surveyTensionWireThirdPartyObjectsAttached: boolean | null;
	surveyTensionWireGaffTerminalDamage: boolean | null;
	surveyTensionWireGaffTerminalMissingParts: boolean | null;
	surveyTensionWireFaultyMontage: boolean | null;
	surveyTensionWireClampDamage: boolean | null;
	surveyTensionWireImagery: number | null;
	surveyTensionWireRemarks: string | null;
};

export type SurveyLuminaireSurveyData = {
	surveyLuminaireDamage: boolean | null;
	surveyLuminaireImagery: number | null;
	surveyLuminaireRemarks: string | null;
};

export type SurveyNodeData = {
	surveyNodeDamage: boolean | null;
	surveyNodeImagery: number | null;
	surveyNodeRemarks: string | null;
};
