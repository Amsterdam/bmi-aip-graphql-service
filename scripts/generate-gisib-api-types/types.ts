export type Property = {
	key: string;
	types: Array<null | undefined | 'string' | 'boolean' | 'number'>;
};

export type ObjectProperty = { optional: boolean } & {
	[key: string]: Property;
};

export type Types = {
	[key: string]: Property | ObjectProperty;
};
