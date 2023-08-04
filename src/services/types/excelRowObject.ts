import { SupportSystemType } from '../../schema/span-installation/types';

export interface IPassport {
	passportIdentification?: string;
	passportCityArea?: string;
	passportDistrict?: string;
	passportNeighborhood?: string;
	passportStreet?: string;
	passportYear?: number;
	passportPowerSupplies?: number;
	passportSplits?: boolean;
	passportDoubleWired?: boolean;
	tramTracks?: boolean;
	notes?: string;
}

export type ExcelRowObject = {
	Installatiegroep?: number;
	'aantal voedingen'?: number;
	'aantal armaturen'?: number;
	Mastgetal?: number;
	'Techview Id'?: number;
	Stadsdeel?: string;
	Wijk?: string;
	Buurt?: string;
	'nieuwe straatnaam'?: string;
	X?: number;
	Y?: number;
	'situatie nw'?: string;
	'def batch'?: number;
	'LOB-tram'?: string;
	'Id-Armatuur'?: number;
	'Type Armatuur'?: string;
	'Oormerk Armatuur'?: string;
	Familie?: string;
	'Aanp. K-Hang/Bol (contract 3)'?: string;
	'Boven tram'?: string;
	'Armatuur > 3m bovenleiding (tbv Contract 3)'?: string;
	Lichtpunthoogte?: number;
	'Id-mast (niet weergeven, tbv export)'?: number;
	'Id-Uithouder (niet weergeven, tbv export)'?: number;
};

export type ExcelSupportSystemProps = Pick<
	ExcelRowObject,
	| 'Mastgetal'
	| 'Techview Id'
	| 'Stadsdeel'
	| 'Wijk'
	| 'Buurt'
	| 'nieuwe straatnaam'
	| 'X'
	| 'Y'
	| 'situatie nw'
	| 'def batch'
	| 'LOB-tram'
	| 'Lichtpunthoogte'
> & {
	type: SupportSystemType;
	luminaires: ExcelLuminaireProps[];
};

export type ExcelJunctionBoxProps = Pick<
	ExcelRowObject,
	| 'Mastgetal'
	| 'Techview Id'
	| 'Stadsdeel'
	| 'Wijk'
	| 'Buurt'
	| 'nieuwe straatnaam'
	| 'X'
	| 'Y'
	| 'situatie nw'
	| 'def batch'
	| 'LOB-tram'
	| 'Lichtpunthoogte'
	| 'Id-mast (niet weergeven, tbv export)'
>;

export type ExcelLuminaireProps = Pick<
	ExcelRowObject,
	| 'Id-Armatuur'
	| 'Type Armatuur'
	| 'Oormerk Armatuur'
	| 'Familie'
	| 'Aanp. K-Hang/Bol (contract 3)'
	| 'Boven tram'
	| 'Armatuur > 3m bovenleiding (tbv Contract 3)'
>;

export type NormalizedInstallationFromExcel = {
	id: number;
	situations?: string[];
	totalJunctionBoxes?: number;
	totalLuminaires?: number;
	object?: {
		'nieuwe straatnaam': string;
		passport: IPassport;
	};
	supportSystems?: ExcelSupportSystemProps[];
	junctionBoxes?: ExcelJunctionBoxProps[];
	types?: SupportSystemType[];
	spin?: boolean;
	tramTracks?: boolean;
	passportSplits?: boolean;
};

export type OVSSpanMeasureExcelRowObject = {
	Onderdelen: string;
	Maatregelen: string; // newline separated
	'Materiaal uit (M)agazijn': string;
	Besteksposten: string; // comma separated
	Opmerking: string;
};

export type BestekspostenExcelRowObject = {
	'Bestekspostnr.': string;
	'Postomschrijving (beknopt)': string;
	'Eenh.': string;
};
export type MNummersExcelRowObject = {
	'Voorlopige benaming': string;
	'M-nummer': string;
	'Eenh.': string;
	'Omschrijving artikel': string;
	Opmerking: string;
};
