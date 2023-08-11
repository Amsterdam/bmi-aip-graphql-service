import { OVSExportSpanInstallationBaseData } from '../types/span-installation';

const ovsAssetBaseDataStub = {
	id: 'object1',
	name: 'Installation 1',
	code: 'CODE1',
};

const ovsAssetBatchDataStub = {
	batchNumber: 'batch1',
	batchStatus: 'active',
};

const ovsAssetPassportStub = {
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

export const ovsAssetStub: OVSExportSpanInstallationBaseData = {
	...ovsAssetBaseDataStub,
	...ovsAssetBatchDataStub,
	attributes: {
		...ovsAssetPassportStub,
	},
};
