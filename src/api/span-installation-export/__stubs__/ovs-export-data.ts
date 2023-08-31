import {
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../../../types';
import {
	OVSRow,
	DecompositionFacadeData,
	DecompositionTensionWireData,
	DecompositionMastData,
	DecompositionNodeData,
	OVSPassportData,
	DecompositionLuminaireData,
	DecompositionJunctionBoxData,
	SurveyMastData,
	SurveyNodeData,
	SurveyFacadeData,
	SurveyTensionWireData,
	SurveyLuminaireSurveyData,
	SurveyJunctionBoxData,
} from '../types';

const assetBaseData: OVSBaseData = {
	id: '1',
	name: 'test',
	code: 'test',
};

export const assetBatchData: OVSBatchData = {
	batchNumbers: '1',
	batchStatus: 'active',
};

export const passportData: OVSPassportData = {
	passportStreet: 'test',
	passportNeighborhood: 'test',
	passportDistrict: 'test',
	passportCityArea: 'test',
	passportSplits: true,
	passportDoubleWired: true,
	passportTramTracks: true,
	passportNotes: 'test',
	// passportYear: 1,
	// passportPowerSupplies: 1,
};

export type OVSSupportSystemData = {
	supportSystemTypeDetailed: string;
	supportSystemStreet: string;
	supportSystemHouseNumber: string;
	supportSystemFloor: string;
	supportSystemXCoordinate: string;
	supportSystemYCoordinate: string;
	supportSystemInstallationHeight: string;
	supportSystemInstallationLength: string;
	supportSystemRemarks: string;
};

export const decompositionJunctionBoxData: DecompositionJunctionBoxData = {
	junctionBoxTechviewId: 10,
	junctionBoxMastId: 10,
	junctionBoxMastNumber: 33.33,
	junctionBoxXCoordinate: 116211.88,
	junctionBoxYCoordinate: 487352.77,
	junctionBoxInstallationHeight: 10,
	junctionBoxRiserTubeVisible: true,
	junctionBoxLocation: '__LOCATION__',
};

export const decompositionFacadeData: DecompositionFacadeData = {
	facadeTypeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
	facadeLocation: 'test',
	facadeLocationIndication: 'test',
	facadeHouseNumber: 'test',
	facadeXCoordinate: 12.345,
	facadeYCoordinate: 23.456,
	facadeInstallationHeight: 1,
	facadeInstallationLength: 1,
	facadeRemarks: 'test',
};

export const tensionWireData: DecompositionTensionWireData = {
	tensionWireTypeDetailed: SupportSystemTypeDetailedTensionWire.Denhalon,
	tensionWireLocation: 'test',
	tensionWireInstallationLength: 1,
	tensionWireRemarks: 'test',
};

export const luminaireData: DecompositionLuminaireData = {
	luminaireSphere: '__AANPAK__', // Displayed as 'Aanp. K-Hang/Bol' in Excel (as part of the Paspoort section)
	luminaireLocation: '__LOCATION__',
	luminaireHasLED: true,
	luminaireXCoordinate: 116211.88,
	luminaireYCoordinate: 487352.77,
	luminaireRemarks: '__REMARKS__',
};

export const mastData: DecompositionMastData = {
	mastTypeDetailed: SupportSystemTypeDetailedMast.Gvb,
	mastLocation: 'test',
	mastXCoordinate: 12.345,
	mastYCoordinate: 23.456,
	mastInstallationHeight: 1,
	mastRemarks: 'test',
};

export const nodeData: DecompositionNodeData = {
	nodeTypeDetailed: SupportSystemTypeDetailedNode.Ring,
	nodeLocation: 'test',
	nodeXCoordinate: 12.345,
	nodeYCoordinate: 23.456,
	nodeInstallationHeight: 1,
	nodeRemarks: 'test',
};

export const facadeSurveyData: SurveyFacadeData = {
	surveyFacadeDamageWithin1m: false,
	surveyFacadeHinderingVegetation: false,
	surveyFacadeWallPlateDamage: false,
	surveyFacadeFaultyMontage: false,
	surveyFacadeNutNotFullyOverThreadedRod: false,
	surveyFacadeMissingFasteners: false,
	surveyFacadeMeasuredPreload: 0,
	surveyFacadeAppliedAdditionalTraction: 0,
	surveyFacadeConnectionFailed: true,
	surveyFacadeConnectionFailureAdditionalTraction: 0,
	surveyFacadeImagery: 1,
	surveyFacadeRemarks: '__REMARKS__',
};

export const mastSurveyData: SurveyMastData = {
	surveyMastDamage: true,
	surveyMastMissingParts: false,
	surveyTensionMastAngle: 10,
	surveyMastAttachmentDamage: true,
	surveyMastBracketMissingParts: false,
	surveyMastBracketDamage: true,
	surveyMastImagery: 3,
	surveyMastRemarks: 'test',
};

export const tensionWireSurveyData: SurveyTensionWireData = {
	surveyTensionWireDamage: true,
	surveyTensionWireThirdPartyObjectsAttached: true,
	surveyTensionWireGaffTerminalDamage: true,
	surveyTensionWireGaffTerminalMissingParts: true,
	surveyTensionWireFaultyMontage: true,
	surveyTensionWireClampDamage: true,
	surveyTensionWireImagery: 1,
	surveyTensionWireRemarks: '__REMARKS__',
};

export const luminaireSurveyData: SurveyLuminaireSurveyData = {
	surveyLuminaireDamage: true,
	surveyLuminaireImagery: 1,
	surveyLuminaireRemarks: '__REMARKS__',
};

export const nodeSurveyData: SurveyNodeData = {
	surveyNodeDamage: true,
	surveyNodeImagery: 3,
	surveyNodeRemarks: 'test',
};

export const junctionBoxSurveyData: SurveyJunctionBoxData = {
	surveyJunctionBoxCableDamage: true,
	surveyJunctionBoxFaultyMontageTensionWire: false,
	surveyJunctionBoxFaultyMontageFacade: true,
	surveyJunctionBoxDamage: true,
	surveyJunctionBoxStickerNotReadable: true,
	surveyJunctionBoxRemarks: '__REMARKS__',
	surveyJunctionBoxImagery: 2,
};

export const ovsRecordMock: OVSRow = {
	...assetBaseData,
	...assetBatchData,
	...passportData,
	...assetBatchData,
	entityName: '__ENTITY_NAME__',
	...decompositionJunctionBoxData,
	...decompositionFacadeData,
	...tensionWireData,
	...mastData,
	...nodeData,
	...luminaireData,
	...junctionBoxSurveyData,
	...facadeSurveyData,
	...mastSurveyData,
	...tensionWireSurveyData,
	...luminaireSurveyData,
	...nodeSurveyData,
};

export type OVSBaseData = {
	id: string;
	name: string;
	code: string;
};

export type OVSBatchData = {
	batchNumbers: string;
	batchStatus: string;
};
