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
	SurveyMastData,
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

export const ovsRecordMock: OVSRow = {
	...assetBaseData,
	...assetBatchData,
	...passportData,
	...assetBatchData,
	...decompositionFacadeData,
	...tensionWireData,
	...mastData,
	...nodeData,
	...luminaireData,
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
