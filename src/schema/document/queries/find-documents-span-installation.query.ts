import { DocumentProvider } from '../types';

export class FindDocumentsSpanInstallationQuery {
	public constructor(
		public readonly assetId: string,
		public readonly surveyId: string,
		public readonly entityId: string,
		public readonly provider: DocumentProvider,
		public readonly jwtToken: string,
	) {}
}
