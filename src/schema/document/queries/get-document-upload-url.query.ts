import { DocumentProvider } from '../types';

export class GetDocumentUploadUrlQuery {
	public constructor(
		public readonly assetCode: string,
		public readonly fileName: string,
		public readonly provider: DocumentProvider,
		public readonly jwtToken: string,
	) {}
}
