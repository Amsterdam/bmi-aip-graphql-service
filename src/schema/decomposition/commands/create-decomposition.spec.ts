import { MockedObjectDeep } from 'ts-jest';

import { GisibRepository } from '../../../gisib/gisib.repository';
import { asset } from '../../asset/__stubs__';
import { ElementRepository } from '../element.repository';
import { domainElement, domainUnit } from '../__stubs__';
import { UnitRepository } from '../unit.repository';
import { AssetRepository } from '../../asset/asset.repository';
import { gisibAsset, gisibElement1, gisibElement2, gisibUnit1, gisibUnit2 } from '../../../gisib/__stubs__';
import { ElementFactory } from '../element.factory';
import { UnitFactory } from '../unit.factory';

import { CreateDecompositionCommand } from './create-decomposition.command';
import { CreateDecompositionHandler } from './create-decomposition.handler';

import SpyInstance = jest.SpyInstance;

const gisibRepoMock: MockedObjectDeep<GisibRepository> = {
	getAssetByCode: jest.fn().mockResolvedValue(gisibAsset),
	getAssetElements: jest.fn().mockResolvedValue([gisibElement1, gisibElement2]),
	getElementUnits: jest.fn().mockResolvedValue([gisibUnit1, gisibUnit2]),
	...(<any>{}),
};

const assetRepoMock: MockedObjectDeep<AssetRepository> = {
	getAssetByCode: jest.fn().mockResolvedValue(asset),
	...(<any>{}),
};

const elementRepoMock: MockedObjectDeep<ElementRepository> = {
	createElement: jest.fn().mockResolvedValue(domainElement),
	...(<any>{}),
};

const unitRepoMock: MockedObjectDeep<UnitRepository> = {
	createUnit: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

describe('CreateDecompositionHandler', () => {
	describe('execute()', () => {
		let createElementWithUnitsSpy: SpyInstance;

		beforeAll(async () => {
			const command = new CreateDecompositionCommand('BRU001', '__SURVEY_ID__');
			const handler = new CreateDecompositionHandler(gisibRepoMock, assetRepoMock, elementRepoMock, unitRepoMock);
			createElementWithUnitsSpy = jest.spyOn(handler, 'createElementWithUnits');
			createElementWithUnitsSpy.mockImplementation(() => Promise.resolve());
			await handler.execute(command);
		});

		test('fetches asset from GISIB repository by code', () => {
			expect(gisibRepoMock.getAssetByCode).toHaveBeenCalledWith('BRU001');
		});

		test('fetches asset from asset repository by code', () => {
			expect(assetRepoMock.getAssetByCode).toHaveBeenCalledWith('BRU001');
		});

		test('fetches elements from element repository by elementId', () => {
			expect(gisibRepoMock.getAssetElements).toHaveBeenCalledWith(gisibAsset.properties.Id);
		});

		test('resolves once createElementWithUnits() is called for each element', () => {
			expect(createElementWithUnitsSpy).toHaveBeenCalledTimes(2);
			expect(createElementWithUnitsSpy).toHaveBeenCalledWith(asset.id, '__SURVEY_ID__', gisibElement1);
			expect(createElementWithUnitsSpy).toHaveBeenCalledWith(asset.id, '__SURVEY_ID__', gisibElement2);
		});
	});

	describe('createElementWithUnits()', () => {
		beforeAll(async () => {
			const handler = new CreateDecompositionHandler(gisibRepoMock, assetRepoMock, elementRepoMock, unitRepoMock);
			await handler.createElementWithUnits(asset.id, '__SURVEY_ID__', gisibElement1);
		});

		test('creates element', () => {
			expect(elementRepoMock.createElement).toHaveBeenCalledWith(
				ElementFactory.CreateElementInput(asset.id, '__SURVEY_ID__', gisibElement1),
			);
		});

		test('gets units for element', () => {
			expect(gisibRepoMock.getElementUnits).toHaveBeenCalledWith(domainElement.gisibId);
		});

		test('resolves once each unit is created', () => {
			expect(unitRepoMock.createUnit).toHaveBeenCalledTimes(2);
			expect(unitRepoMock.createUnit).toHaveBeenCalledWith(
				UnitFactory.CreateUnitInput(asset.id, '__SURVEY_ID__', domainElement.id, gisibUnit1),
			);
			expect(unitRepoMock.createUnit).toHaveBeenCalledWith(
				UnitFactory.CreateUnitInput(asset.id, '__SURVEY_ID__', domainElement.id, gisibUnit2),
			);
		});
	});
});
