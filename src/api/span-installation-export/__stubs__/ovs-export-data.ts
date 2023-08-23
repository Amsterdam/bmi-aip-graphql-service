import {
	OVSRow,
	DecompositionFacadeData,
	DecompositionTensionWireData,
	DecompositionMastData,
	DecompositionNodeData,
	OVSPassportData,
	DecompositionLuminaireData,
	SurveyMastData,
} from '../types';

const assetBaseData: OVSBaseData = {
	id: '1',
	name: 'test',
	code: 'test',
};

export const assetBatchData: OVSBatchData = {
	batchNumbers: 'test',
	batchStatus: 'test',
};

const passportData: OVSPassportData = {
	passportIdentification: 'test',
	passportCityArea: 'test',
	passportDistrict: 'test',
	passportNeighborhood: 'test',
	passportStreet: 'test',
	passportYear: 1,
	passportPowerSupplies: 1,
	passportSplits: true,
	passportDoubleWired: true,
	passportTramTracks: true,
	passportNotes: 'test',
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

const decompositionFacadeData: DecompositionFacadeData = {
	facadeTypeDetailed: 'test',
	facadeLocation: 'test',
	facadeHouseNumber: 'test',
	facadeLocationIndication: 'test',
	facadeXCoordinate: 1,
	facadeYCoordinate: 1,
	facadeInstallationHeight: 1,
	facadeInstallationLength: 1,
	facadeRemarks: 'test',
};

const tensionWireData: DecompositionTensionWireData = {
	tensionWireTypeDetailed: 'test',
	tensionWireLocation: 'test',
	tensionWireInstallationLength: 1,
	tensionWireRemarks: 'test',
};

const luminaireData: DecompositionLuminaireData = {
	luminaireHasLED: true,
	luminaireLocation: 'test',
	luminaireXCoordinate: 1,
	luminaireYCoordinate: 1,
	luminaireRemarks: 'test',
};

const mastData: DecompositionMastData = {
	mastTypeDetailed: 'test',
	mastLocation: 'test',
	mastXCoordinate: 1,
	mastYCoordinate: 1,
	mastInstallationHeight: 1,
	mastRemarks: 'test',
};

const nodeData: DecompositionNodeData = {
	nodeTypeDetailed: 'test',
	nodeLocation: 'test',
	nodeXCoordinate: 1,
	nodeYCoordinate: 1,
	nodeInstallationHeight: 1,
	nodeRemarks: 'test',
};
const mastSurveyData: SurveyMastData = {
	surveyMastDamage: true,
	surveyMastMissingParts: false,
	surveyTensionMastAngle: 10,
	surveyMastAttachmentDamage: true,
	surveyMastBracketMissingParts: false,
	surveyMastBracketDamage: true,
	surveyMastImagery: 3,
	surveyMastRemarks: 'test',
};

export const ovsRecordMock: OVSRow = {
	...assetBaseData,
	...assetBatchData,
	...passportData,
	...assetBatchData,
	...decompositionFacadeData,
	...tensionWireData,
	...luminaireData,
	...mastData,
	...nodeData,
	...mastSurveyData,
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
