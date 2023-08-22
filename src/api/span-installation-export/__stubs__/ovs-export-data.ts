import { IPassport } from '../../../schema/asset/models/passport.model';
import {
	OVSRow,
	DecompositionFacadeData,
	DecompositionTensionWireData,
	DecompositionMastData,
	DecompositionNodeData,
	OVSPassportData,
	DecompositionLuminaireData,
} from '../types/span-installation';

const assetBaseData: OVSBaseData = {
	id: '1',
	name: 'test',
	code: 'test',
};

export const assetBatchData: OVSBatchData = {
	batchNumbers: '1',
	batchStatus: 'active',
};

const passportData: OVSPassportData = {
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

const decompositionFacadeData: DecompositionFacadeData = {
	facadeTypeDetailed: 'test',
	facadeLocation: 'test',
	facadeLocationIndication: 'test',
	facadeHouseNumber: 'test',
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

export const luminaireData: DecompositionLuminaireData = {
	luminaireLocation: 'test',
	luminaireHasLED: true,
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
