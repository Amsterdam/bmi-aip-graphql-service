// Translated from "Leverancierstype"
// TODO populate this with appropriate options
export enum SupplierType {
	'one' = 'one',
	'two' = 'two',
}

export function getSupplierType(supplierType: string): SupplierType {
	return supplierType === 'one' ? SupplierType.one : SupplierType.two;
}
