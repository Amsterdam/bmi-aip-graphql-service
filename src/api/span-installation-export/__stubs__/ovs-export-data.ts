import { IPassport } from '../../../schema/asset/models/passport.model';
import { OVSRecord, OVSSupportSystemFacadeData } from '../types/span-installation';

const assetBaseData: OVSBaseData = {
	id: '1',
	name: 'test',
	code: 'test',
};

const assetBatchData: OVSBatchData = {
	batchNumbers: 'test',
	batchStatus: 'test',
};

const passportData: IPassport = {
	passportIdentification: 'test',
	passportCityArea: 'test',
	passportDistrict: 'test',
	passportNeighborhood: 'test',
	passportStreet: 'test',
	passportYear: 1,
	passportPowerSupplies: 1,
	passportSplits: true,
	passportDoubleWired: true,
	tramTracks: true,
	notes: 'test',
};

const supportSystemFacadeData: OVSSupportSystemFacadeData = {
	facadeTypeDetailed: 'test',
	facadeStreet: 'test',
	facadeHouseNumber: 'test',
	facadeFloor: 'test',
	facadeXCoordinate: 'test',
	facadeYCoordinate: 'test',
	facadeInstallationHeight: '1',
	facadeInstallationLength: '1',
	facadeRemarks: 'test',
};

export const ovsRecordMock: OVSRecord = {
	...assetBaseData,
	...assetBatchData,
	...passportData,
	...assetBatchData,
	...supportSystemFacadeData,
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
