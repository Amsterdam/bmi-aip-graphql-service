export enum EntityType {
	'Aansluitkast' = 'Aansluitkast',
	'Mast' = 'Mast',
	'Knoop' = 'Knoop',
	'Gevel' = 'Gevel',
	'Spandraad' = 'Spandraad',
	'Armatuur' = 'Armatuur',
}

export type DmsMetadataMappedSpanInstallation = {
	['bron-bruggen']: 'AIP';
	vertrouwelijkheid: 'Openbaar';
	'onderdeel-id': string;
	ingenieursbureau: string;
	documentomschrijving: string;
	'survey-id': string;
	datum: string;
	onderdeel: EntityType;
};
// I.e.: { code: 'BRU0078' }
export type RawDMSRelatedAsset = { code: string };

// @see https://stackoverflow.com/questions/49401866/all-possible-keys-of-an-union-type
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type DMSMetadataProperty<T extends DmsMetadataTypes = DmsMetadataTypes> = {
	key: KeysOfUnion<T>;
	value: T[KeysOfUnion<T>];
};

/**
 * When documents are fetched from the DMS API they are of this type
 */
export type RawDMSDocument<T extends DmsMetadataTypes = DmsMetadataTypes> = {
	guid: string;
	name: string;
	volgnummer: string;
	mime_type: string;
	extension: string;
	pid: string;
	metadata: DMSMetadataProperty<T>[];
	related_assets: RawDMSRelatedAsset[];
	size?: number; // This still needs to be returned from the backend
};
export type DMSDocumentBase = Pick<
	RawDMSDocument,
	'guid' | 'name' | 'volgnummer' | 'mime_type' | 'extension' | 'pid' | 'size'
> & {
	url: string; // `/api/inforing/documents/${guid}/download`
	rawMetadata: DmsMetadataTypes; // Raw metadata as object (not array)
	// jaar: string;
};

export type DmsMetadataSpanInstallation = Record<'tekeningdocumentomschrijving', string> &
	Record<'vertrouwelijkheid', 'Openbaar'> &
	Record<'bron-bruggen', 'AIP'> &
	Record<'actueel', 'Actueel'> &
	Record<'ingenieursbureau-bruggen', string> & // Naam bedrijf van ingelogde gebnuiker
	Record<'onderdeel-id', string> &
	Record<'onderdeel', EntityType> &
	Record<'datum', string> & // Upload datum
	Record<'survey-id-overspanning', string>;

export type DmsMetadataSpanInstallationTypes = DmsMetadataSpanInstallation;

/**
 * In case you need to pass an array of objects that could be any of these types
 */
export type DMSDocumentSpanInstallation = DMSDocumentBase & DmsMetadataMappedSpanInstallation;

export type DmsMetadataTypes = DmsMetadataSpanInstallationTypes;

export function convertMetadataArrayToObject<T extends DmsMetadataTypes = DmsMetadataTypes>(
	metadata: DMSMetadataProperty<T>[],
): T {
	return metadata.reduce((accumulator, keyValueObject) => {
		accumulator[keyValueObject.key] = keyValueObject.value;
		return accumulator;
	}, {} as T);
}
