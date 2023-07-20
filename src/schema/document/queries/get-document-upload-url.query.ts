export class GetDocumentUploadUrl {
	public constructor(
		public readonly assetCode: string,
		public readonly fileName: string,
		public readonly provider: string,
		public readonly ctx: any,
	) {}
}
