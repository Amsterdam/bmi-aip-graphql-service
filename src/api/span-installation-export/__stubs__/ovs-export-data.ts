import { IPassport } from '../../../schema/asset/models/passport.model';
import { OVSRow, FacadeData, TensionWireData } from '../types/span-installation';

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

// const batchesData: DBBatch[] = [
// 	{
// 		id: '1',
// 		name: 'test',
// 		status: 'test',
// 		startDate: new Date(),
// 		endDate: new Date(),
// 		created_at: new Date(),
// 		updated_at: new Date(),
// 		plannedStartDate: new Date(),
// 		plannedEndDate: new Date(),
// 		contractId: '1',
// 		tranchId: '1',
// 		remarks: 'test',
// 		legacyFailureMode: false
// 	},
// ];

// const supportSystemData: IOVSSupportSystem[] = [{
// 	typeDetailed: 'test',
// 	street: 'test',
// 	houseNumber: 'test',
// 	floor: 'test',
// 	xCoordinate: 'test',
// 	yCoordinate: 'test',
// 	installationHeight: 1,
// 	installationLength: 1,
// 	remarks: 'test'
// }];

const facadeData: FacadeData = {
	facadeTypeDetailed: 'test',
	facadeStreet: 'test',
	facadeHouseNumber: 'test',
	facadeFloor: 'test',
	facadeXCoordinate: 'test',
	facadeYCoordinate: 'test',
	facadeInstallationHeight: '1',
	facadeInstallationLength: 1,
	facadeRemarks: 'test',
};

const tensionWireData: TensionWireData = {
	tensionWireTypeDetailed: 'test',
	tensionWireStreet: 'test',
	tensionWireInstallationLength: 1,
	tensionWireRemarks: 'test',
};

export const ovsRecordMock: OVSRow = {
	...assetBaseData,
	...assetBatchData,
	...passportData,
	...assetBatchData,
	...facadeData,
	...tensionWireData,
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
