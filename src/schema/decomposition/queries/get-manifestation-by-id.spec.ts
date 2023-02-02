import { MockedObjectDeep } from 'ts-jest';

import { manifestation } from '../__stubs__';
import { ManifestationService } from '../manifestation.service';

import { GetManifestationByIdQuery } from './get-manifestation-by-id.query';
import { GetManifestationByIdHandler } from './get-manifestation-by-id.handler';

const serviceMock: MockedObjectDeep<ManifestationService> = {
	getManifestationById: jest.fn().mockResolvedValue(manifestation),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetManifestationBySurveyIdQuery', () => {
	test('executes query', async () => {
		const query = new GetManifestationByIdQuery(identifier);
		const result = await new GetManifestationByIdHandler(serviceMock).execute(query);

		expect(serviceMock.getManifestationById).toHaveBeenCalledTimes(1);
		expect(serviceMock.getManifestationById).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(manifestation);
	});
});
