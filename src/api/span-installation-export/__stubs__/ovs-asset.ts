import { IPassport } from '../../../schema/asset/models/passport.model';
import { DBBatch } from '../../../schema/batch/types/batch.repository.interface';
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

export const dbBatchStub: DBBatch = {
	id: '',
	name: 'OVS Batch 02',
	status: 'active',
	startDate: undefined,
	endDate: undefined,
	plannedStartDate: undefined,
	plannedEndDate: undefined,
	contractId: '',
	tranchId: '',
	remarks: '',
	legacyFailureMode: false,
	created_at: undefined,
	updated_at: undefined,
};
