import { IPassport } from '../../../schema/asset/models/passport.model';
import { OVSBaseData, OVSExportSpanInstallationBaseData } from '../types/span-installation';

const ovsAssetBaseDataStub: OVSBaseData = {
	id: 'object1',
	name: 'Installation 1',
	code: 'CODE1',
};

// const ovsAssetBatchDataStub: OVSBatchData = {
// 	batchNumbers: 'batch1, batch2',
// 	batchStatus: 'active',
// };

const ovsAssetPassportStub: IPassport = {
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
	attributes: {
		...ovsAssetPassportStub,
	},
};
