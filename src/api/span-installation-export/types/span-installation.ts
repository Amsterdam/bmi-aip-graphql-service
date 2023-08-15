import { Prisma } from '@prisma/client';
import { IPassport } from 'src/schema/asset/models/passport.model';
import { Cell } from 'exceljs';
import { UnionKeys } from 'src/utils/utils';

export type OVSBaseData = {
	id: string;
	name: string;
	code: string;
};

export type OVSBatchData = {
	batchNumbers: string;
	batchStatus: string;
};

export type OVSPassportData = IPassport;

export interface OVSRecord extends OVSBaseData, OVSBatchData, OVSPassportData {}

export type OVSExportSpanInstallationBaseData = {
	id: string;
	name: string;
	code: string;
	attributes: IPassport;
};

export type OVSExportSpanInstallationPasportData = {
	id: string;
	name: string;
	code: string;
	location: string;
	latitude: Prisma.Decimal;
	longitude: Prisma.Decimal;
	attributes: IPassport;
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

export interface OVSExportColumn {
	key: OVSColumnHeaderKeys;
	header: string;
	headerStyle: OVSExportHeaderStyle;
	/**
	 * Adds data to Cell
	 * @param {Cell} cell Cell reference to exceljs data workbook > sheet > row > cell
	 * @param {any} value Value from DB to fit into cell
	 */
	renderCell: (cell: Cell, value: any, rowIdx: number, columnIdx: string) => void;
	width?: number;
}

export type OVSColumnHeaderKeys = UnionKeys<OVSRecord>;
