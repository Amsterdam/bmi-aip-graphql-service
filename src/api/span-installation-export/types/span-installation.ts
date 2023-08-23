import { Prisma } from '@prisma/client';
import { Cell } from 'exceljs';

import { IPassport } from '../../../services/types/excelRowObject';
import { UnionKeys } from '../../../utils/utils';

import { SurveyMastData } from './survey';

export type OVSBaseData = {
	id: string;
	name: string;
	code: string;
};

export type OVSBatchData = {
	batchNumbers: string;
	batchStatus: string;
};

/**
 * @deprecated
 */
export type OVSSupportSystemData = {
	supportSystemTypeDetailed: string;
	supportSystemStreet: string;
	supportSystemHouseNumber: string;
	supportSystemLocationIndication: string;
	supportSystemXCoordinate: string;
	supportSystemYCoordinate: string;
	supportSystemInstallationHeight: Prisma.Decimal;
	supportSystemInstallationLength: Prisma.Decimal;
	supportSystemRemarks: string;
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
	luminaireLocation: string | null;
	luminaireHasLED: boolean | null;
	luminaireXCoordinate: number | null;
	luminaireYCoordinate: number | null;
	luminaireRemarks: string | null;
};

export type OVSPassportData = IPassport & { passportTramTracks: boolean; passportNotes: string };

// OVS Record describes a single row of data in the Excel export
export interface OVSRow
	extends OVSBaseData,
		OVSBatchData,
		OVSPassportData,
		DecompositionFacadeData,
		DecompositionTensionWireData,
		DecompositionLuminaireData,
		DecompositionMastData,
		DecompositionNodeData,
		SurveyMastData {}

export interface OVSRowBase extends OVSBaseData, OVSBatchData, OVSPassportData {}

export type OVSExportSpanInstallationBaseData = {
	id: string;
	name: string;
	code: string;
	attributes: IPassport;
};

export type OVSExportSpanInstallationPassportData = {
	id: string;
	name: string;
	code: string;
	location: string;
	latitude: Prisma.Decimal;
	longitude: Prisma.Decimal;
	attributes: IPassport;
};

export type OVSExportSpanInstallationDecompositionFacadeData = {
	typeDetailed: string;
	street: string;
	houseNumber: string;
	verdieping: string;
	xCoordinate: string;
	yCoordinate: string;
	installationHeight: Prisma.Decimal;
	installationLength: Prisma.Decimal;
	remarks: string;
};

export type OVSExportSpanInstallationWithBatchDetails = OVSExportSpanInstallationBaseData & {
	batch: {
		name: string;
		status: string;
	};
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
	header: string;
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
