export enum SupportSystemType {
	'tensionWire' = 'tensionWire',
	'facade' = 'facade',
	'mast' = 'mast',
	'ring' = 'ring',
}

// TODO populate this with appropriate options
export enum SupportSystemTypeDetailed {
	'one' = 'one',
	'two' = 'two',
}

export function getSupportSystemTypeDetailed(supportSystemTypeDetailed: string): SupportSystemTypeDetailed {
	return supportSystemTypeDetailed === 'one' ? SupportSystemTypeDetailed.one : SupportSystemTypeDetailed.two;
}

export function getSupportSystemType(supportSystemType: string): SupportSystemType {
	switch (supportSystemType) {
		case 'tensionWire':
			return SupportSystemType.tensionWire;
		case 'facade':
			return SupportSystemType.facade;
		case 'mast':
			return SupportSystemType.mast;
		case 'ring':
			return SupportSystemType.ring;
		default:
			return null;
	}
}
