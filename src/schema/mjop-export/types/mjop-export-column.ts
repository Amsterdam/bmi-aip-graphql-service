import { Cell } from 'exceljs';

import { MJOPColumnHeaderKeys } from './mjop-record';

export interface MjopExportHeaderStyle {
	bgColor: string;
	textColor: string;
	italic?: boolean;
	underline?: boolean;
	bold?: boolean;
	strike?: boolean;
}

export interface MjopExportColumn {
	key: MJOPColumnHeaderKeys;
	header: string;
	headerStyle: MjopExportHeaderStyle;
	/**
	 * Adds data to Cell
	 * @param {Cell} cell Cell reference to exceljs data workbook > sheet > row > cell
	 * @param {any} value Value from DB to fit into cell
	 */
	renderCell: (cell: Cell, value: unknown, rowIdx: number, columnIdx: string) => void;
	width?: number;
}
