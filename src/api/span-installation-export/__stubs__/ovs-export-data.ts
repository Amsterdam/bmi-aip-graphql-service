import { IPassport } from '../../../schema/asset/models/passport.model';
import { OVSRecord } from '../types/span-installation';

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

export const ovsRecordMock: OVSRecord = {
	...assetBaseData,
	...assetBatchData,
	...passportData,
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
