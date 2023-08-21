import { Prisma } from '@prisma/client';
import { Cell } from 'exceljs';

import { IPassport } from '../../../services/types/excelRowObject';
import { UnionKeys } from '../../../utils/utils';

export type OVSBaseData = {
	id: string;
	name: string;
	code: string;
};

export type OVSBatchData = {
	batchNumbers: string;
	batchStatus: string;
};

export type OVSSupportSystemData = {
	supportSystemTypeDetailed: string;
	supportSystemStreet: string;
	supportSystemHouseNumber: string;
	supportSystemFloor: string;
	supportSystemXCoordinate: string;
	supportSystemYCoordinate: string;
	supportSystemInstallationHeight: string;
	supportSystemInstallationLength: string;
	supportSystemRemarks: string;
};

export type FacadeData = {
	facadeTypeDetailed: string;
	facadeStreet: string;
	facadeHouseNumber: string;
	facadeFloor: string;
	facadeXCoordinate: string;
	facadeYCoordinate: string;
	facadeInstallationHeight: string;
	facadeInstallationLength: number;
	facadeRemarks: string;
};

export type TensionWireData = {
	tensionWireTypeDetailed: string;
	tensionWireInstallationLength: number;
	tensionWireStreet: string;
	tensionWireRemarks: string;
};

export type OVSPassportData = IPassport;

// OVS Record describes a single row of data in the Excel export
export interface OVSRow
	extends OVSBaseData,
		OVSBatchData,
		OVSPassportData,
		OVSSupportSystemData,
		FacadeData,
		TensionWireData {}

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
	installationHeight: string;
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
