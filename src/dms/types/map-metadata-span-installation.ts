import {
	DmsMetadataMappedSpanInstallation,
	DmsMetadataSpanInstallationTypes,
} from '../types/dms-document-span-installation';

export function mapMetadataSpanInstallation(
	metadata: DmsMetadataSpanInstallationTypes,
): DmsMetadataMappedSpanInstallation {
	try {
		return {
			['bron-bruggen']: metadata['bron-bruggen'],
			ingenieursbureau: metadata['ingenieursbureau-bruggen'],
			vertrouwelijkheid: metadata.vertrouwelijkheid,
			documentomschrijving: metadata.tekeningdocumentomschrijving,
			'onderdeel-id': metadata['onderdeel-id'],
			onderdeel: metadata.onderdeel,
			datum: metadata.datum,
			'survey-id': metadata['survey-id-overspanning'],
		};
	} catch (e) {
		throw new Error('[DMS] Bug: failed to determine DMS category for SpanInstallation metadata');
	}
}
