import { SupportSystemType } from '../../schema/span-installation/types';

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
	supportSystems?: ExcelSupportSystemProps[];
	junctionBoxes?: ExcelJunctionBoxProps[];
	types?: SupportSystemType[];
	spin?: boolean;
};