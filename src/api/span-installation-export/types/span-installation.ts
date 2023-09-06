import { Cell } from 'exceljs';

import { IPassport } from '../../../services/types/excelRowObject';
import { UnionKeys } from '../../../utils/utils';

import {
	SurveyFacadeData,
	SurveyJunctionBoxData,
	SurveyLuminaireSurveyData,
	SurveyMastData,
	SurveyNodeData,
	SurveyTensionWireData,
} from './survey';

export type OVSColumnHeaderValues =
	| 'OVS nummer'
	| 'Batch nummer(s)'
	| 'Batch status'
	| 'Straat'
	| 'Buurt'
	| 'Wijk'
	| 'Stadsdeel'
	| 'Splitsingen'
	| 'Dubbeldraads'
	| 'Boven trambaan'
	| 'Opmerkingen'
	| 'Onderdeel'
	| 'Type gedetailleerd'
	| 'Huisnummer'
	| 'Verdieping'
	| 'X-coördinaat'
	| 'Y-coördinaat'
	| 'Aanleghoogte'
	| 'Lengte spandraad'
	| 'Reeds voorzien van LED'
	| 'Lichtpuntnummer'
	| 'Stijgbuis zichtbaar?'
	| 'Opmerkingen'
	| 'Schade aan mast?'
	| 'Ontbrekende onderdelen aan de mast?'
	| 'Hoek van de spanmast'
	| 'Schade aan mastopzetstuk?'
	| 'Ontbrekende onderdelen aan mastbeugel?'
	| 'Schade aan mastbeugel?'
	| 'Beeldmateriaal'
	| 'Schade aan de knoop?'
	| 'Schade op gevel?'
	| 'Begroeiing?'
	| 'Schade aan muurplaat?'
	| 'Onjuiste montage?'
	| 'Moer niet volledig over draadeind?'
	| 'Ontbrekende bevestigingsmaterialen?'
	| 'Gemeten voorspanning'
	| 'Toegepaste additionele trekkracht'
	| 'Gevelverbinding gefaald?'
	| 'Additionele trekkracht waarbij gevelverbinding faalde'
	| 'Schade aan spandraad?'
	| 'Object van derden aan spandraad bevestigd?'
	| 'Schade aan spandraadklem?'
	| 'Schade aan gaffelterminal?'
	| 'Ontbrekende onderdelen aan gaffelterminal?'
	| 'Schade aan armatuur?'
	| 'Schade aansluitkabel?'
	| 'Onjuiste montage aan spandraad?'
	| 'Onjuiste montage aangevel?'
	| 'Schade aan aansluitkast?'
	| 'Sticker met ID onbruikbaar/onleesbaar'
	| 'Techview Id'
	| 'Id-mast'
	| 'Aanp. K-Hang/Bol'
	| 'Sticker met ID onbruikbaar/onleesbaar'
	| 'Maatregel'
	| 'Bestekspost'
	| 'Aantal ingeschat'
	| 'Aantal gebruikt'
	| 'Eenheid'
	| 'Status'
	| 'Materiaal'
	// Maatregelen
	| 'Bestekspost'
	| 'Aantal ingescht'
	| 'Aantal gebruikt'
	| 'Eenheid'
	| 'Materiaal'
	| 'Eenheid'
	| 'Status';

export type OVSBaseData = {
	id: string;
	name: string;
	code: string;
};

export type OVSEntityType = {
	entityName: string;
};

export type OVSBatchData = {
	batchNumbers: string;
	batchStatus: string;
};

export type GeoJSONPoint = {
	type: 'Point';
	coordinates: [number, number];
};

export type DecompositionFacadeData = {
	facadeTypeDetailed: string | null;
	facadeLocation: string | null;
	facadeHouseNumber: string | null;
	facadeLocationIndication: string | null;
	facadeXCoordinate: number | null;
	facadeYCoordinate: number | null;
	facadeInstallationHeight: number | null;
	facadeInstallationLength: number | null;
	facadeRemarks: string | null;
};

export type DecompositionTensionWireData = {
	tensionWireTypeDetailed: string | null;
	tensionWireInstallationLength: number | null;
	tensionWireLocation: string | null;
	tensionWireRemarks: string | null;
};

export type DecompositionMastData = {
	mastTypeDetailed: string | null;
	mastLocation: string | null;
	mastXCoordinate: number | null;
	mastYCoordinate: number | null;
	mastInstallationHeight: number | null;
	mastRemarks: string | null;
};

export type DecompositionNodeData = {
	nodeTypeDetailed: string | null;
	nodeLocation: string | null;
	nodeXCoordinate: number | null;
	nodeYCoordinate: number | null;
	nodeInstallationHeight: number | null;
	nodeRemarks: string | null;
};
export type DecompositionLuminaireData = {
	luminaireSphere: string | null; // Displayed as 'Aanp. K-Hang/Bol' in Excel (as part of the Paspoort section)
	luminaireLocation: string | null;
	luminaireHasLED: boolean | null;
	luminaireXCoordinate: number | null;
	luminaireYCoordinate: number | null;
	luminaireRemarks: string | null;
};

export type DecompositionJunctionBoxData = {
	junctionBoxTechviewId: number | null; // Displayed as 'Techview Id' in Excel (as part of the Paspoort section)
	junctionBoxMastId: number | null; // Displayed as 'Id-mast' in Excel (as part of the Paspoort section)
	junctionBoxMastNumber: number | null;
	junctionBoxInstallationHeight: number | null;
	junctionBoxXCoordinate: number | null;
	junctionBoxYCoordinate: number | null;
	junctionBoxRiserTubeVisible: boolean | null;
	junctionBoxLocation: string | null;
};

export type MeasureLuminaireData = {
	spanMeasureLuminaireDescription: string | null;
};

export type MeasureItemLuminaireData = {
	spanMeasureItemSpecificationItemLuminaireDescription: string | null;
	spanMeasureItemSpecificationItemLuminaireQuantityEstimate: number | null;
	spanMeasureItemSpecificationItemLuminaireQuantityActual: number | null;
	spanMeasureItemSpecificationItemLuminaireQuantityUnitOfMeasurement: string | null;
	spanMeasureItemSpecificationItemLuminaireStatus: string | null;
	spanMeasureItemMaterialLuminaireDescription: string | null;
	spanMeasureItemMaterialLuminaireQuantityEstimate: number | null;
	spanMeasureItemMaterialLuminaireQuantityActual: number | null;
	spanMeasureItemMaterialLuminaireQuantityUnitOfMeasurement: string | null;
	spanMeasureItemMaterialLuminaireStatus: string | null;
};

export type OVSPassportData = IPassport & { passportTramTracks: boolean; passportNotes: string };

// OVS Record describes a single row of data in the Excel export
export interface OVSRow
	extends OVSBaseData,
		OVSEntityType,
		OVSBatchData,
		OVSPassportData,
		DecompositionJunctionBoxData,
		DecompositionFacadeData,
		DecompositionTensionWireData,
		DecompositionLuminaireData,
		DecompositionMastData,
		DecompositionNodeData,
		SurveyJunctionBoxData,
		SurveyFacadeData,
		SurveyMastData,
		SurveyTensionWireData,
		SurveyLuminaireSurveyData,
		SurveyNodeData,
		MeasureItemLuminaireData {}

export interface OVSRowBase extends OVSBaseData, OVSBatchData, OVSPassportData {}

export type OVSExportSpanInstallationBaseData = {
	id: string;
	name: string;
	code: string;
	attributes: IPassport;
};

export interface OVSExportHeaderStyle {
	bgColor: string;
	textColor: string;
	italic?: boolean;
	underline?: boolean;
	bold?: boolean;
	strike?: boolean;
}

export type RenderCellFunction = (cell: Cell, value: any, rowIdx: number, columnIdx: string) => void;

export interface OVSExportColumn {
	key: OVSColumnHeaderKeys;
	header: OVSColumnHeaderValues;
	headerStyle: OVSExportHeaderStyle;
	/**
	 * Adds data to Cell
	 * @param {Cell} cell Cell reference to exceljs data workbook > sheet > row > cell
	 * @param {any} value Value from DB to fit into cell
	 */
	renderCell?: RenderCellFunction;
	width?: number;
}

export type OVSColumnHeaderKeys = UnionKeys<OVSRow>;
