import { Injectable } from '@nestjs/common';

@Injectable()
export class OVSDataService {
	// TODO this function is not needed, because the data is already available in the span-installation-export.service.ts
	// however, we should refactor the span-installation-export.service.ts to use this function
	// public async getOVSData(ovsAsset: OVSExportSpanInstallationWithBatchDetails): Promise<Partial<OVSRecord>> {
	// 	const asset: Asset = await this.assetService.getAssetById(object.id);
	// 	const assetData: IMJOPAsset = this.getAssetProps(asset);
	// 	const mjopData: Partial<OVSRecord> = {
	// 		asset: assetData
	// 	};
	// 	return mjopData;
	// }
}
