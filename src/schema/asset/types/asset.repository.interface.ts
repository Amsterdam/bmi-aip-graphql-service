export interface IAssetRepository {
	getWritableAssetCodesForCompanyId(companyId: string): Promise<string[]>;
}
