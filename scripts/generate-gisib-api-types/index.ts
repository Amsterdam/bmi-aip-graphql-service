import 'dotenv/config';
import * as fs from 'fs';

import * as prettier from 'prettier';

import { GisibResponse } from '../../src/gisib/types/GisibResponse';

import { ObjectProperty, Property, Types } from './types';
import { login } from './login';
import { getElements } from './getElements';
import { getUnits } from './getUnits';
import { getAssets } from './getAssets';

const makeUnique = (arr: any[]) => [...new Set(arr)];

const getValueType = (value: unknown) => {
	if (typeof value === 'number') {
		return 'number';
	}
	if (typeof value === 'boolean') {
		return 'boolean';
	}
	if (typeof value === 'string') {
		return 'string';
	}

	return value;
};

const getObjectType = (input: GisibResponse<any>, objectKey: string): ObjectProperty | null => {
	const idx = input.features.findIndex((feature) => feature?.properties?.[objectKey]?.Id);
	if (!input.features?.[idx]) return null;

	const optional =
		input.features.length !== input.features.filter((feature) => !!feature.properties?.[objectKey] ?? false).length;

	return Object.keys(input.features?.[idx].properties?.[objectKey])
		.map((key) => key)
		.reduce(
			(acc, key) => {
				const valueTypes = input.features
					.map((feature) => feature.properties?.[objectKey]?.[key] ?? null)
					.map((value) => getValueType(value));

				acc[key] = {
					key,
					types: makeUnique(valueTypes),
				};

				return acc;
			},
			{ optional } as ObjectProperty,
		);
};

const propertyToOutput = (prop: Property): string => {
	let propTypes = prop.types;
	if (propTypes.length === 1 && propTypes[0] === null) {
		propTypes = [null, 'string'];
	}

	return `"${prop.key}": ${propTypes
		.map((type) => {
			if (typeof type === 'string') {
				return type?.replace("'", '') ?? type;
			}
			if (type === null) {
				return 'null';
			}
			if (type === undefined) {
				return 'undefined';
			}
			throw new Error('Failed at determining appropriate type');
		})
		.join('|')};`;
};

const objectToOutput = (key: string, object: ObjectProperty): string => {
	if (!object) return `"${key}": null;`;
	return `"${key}"${object.optional ? '?' : ''}: { ${Object.keys(object).reduce((acc, k) => {
		if (k === 'optional') return acc;
		acc += propertyToOutput(object[k]);
		return acc;
	}, '')} };`;
};

const generateType = (name: string, input: GisibResponse<any>, path: string): void => {
	// Determine complete array of keys
	const keys: string[] = input.features.reduce((acc, feature) => {
		Object.keys(feature.properties).forEach((key) => {
			if (!acc.includes(key)) {
				acc.push(key);
			}
		});
		return acc;
	}, []);

	const types: Types = keys.reduce((acc, key) => {
		const idx = input.features.findIndex((feature) => feature?.properties?.[key]?.Id);
		if (idx !== -1) {
			// We're dealing with an object (always has an Id property)
			acc[key] = getObjectType(input, key);
			return acc;
		}

		const valueTypes = input.features
			.map((feature) => feature.properties?.[key])
			.map((value) => getValueType(value));

		acc[key] = {
			key,
			types: makeUnique(valueTypes),
		};

		return acc;
	}, {} as Types);

	let output = '';
	Object.keys(types).forEach((key) => {
		if (types[key]?.key) {
			// Property
			output += propertyToOutput(types[key] as Property);
		} else {
			// Object
			output += objectToOutput(key, types[key] as ObjectProperty);
		}
	});
	output = `
		/**
		 * This file is auto-generated using the \`npm run generate:gisib-api-types\` command.
		 * DO NOT EDIT or risk that your changes will be overwritten.
		 */
		export type ${name} = {
			${output}
		}
	`;

	fs.writeFileSync(
		path,
		prettier.format(output, {
			singleQuote: true,
			trailingComma: 'all',
			arrowParens: 'always',
			tabWidth: 4,
			useTabs: true,
			printWidth: 120,
			parser: 'typescript',
		}),
	);
};

(async () => {
	if (
		!process.env?.GISIB_API_USERNAME ||
		!process.env?.GISIB_API_PASSWORD ||
		!process.env?.GISIB_API_KEY ||
		!process.env?.GISIB_API_URL
	) {
		throw new Error('Missing critical environment variables');
	}

	const token = await login();

	const assets = await getAssets(token);
	generateType('GisibAsset', assets, 'src/gisib/types/GisibAsset.ts');
	console.info('Successfully generated src/gisib/types/GisibAsset.ts');

	const elements = await getElements(token);
	generateType('GisibElement', elements, 'src/gisib/types/GisibElement.ts');
	console.info('Successfully generated src/gisib/types/GisibElement.ts');

	const units = await getUnits(token);
	generateType('GisibUnit', units, 'src/gisib/types/GisibUnit.ts');
	console.info('Successfully generated src/gisib/types/GisibUnit.ts');
})();
