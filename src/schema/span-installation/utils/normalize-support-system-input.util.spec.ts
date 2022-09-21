import { Decimal } from '@prisma/client/runtime';

import { SupportSystemType, SupportSystemTypeDetailedFacade } from '../types';
import { createSupportSystemInput, updateSupportSystemInput } from '../__stubs__';
import { CreateSupportSystemNormalizedInput } from '../dto/create-support-system-normalized.input';
import { UpdateSupportSystemNormalizedInput } from '../dto/update-support-system-normalized.input';

import { normalizeSupportSystemInputUtil } from './normalize-support-system-input.util';

describe('normalizeSupportSystemInputUtil', () => {
	test('Converts instance of CreateSupportSystemInput to CreateSupportSystemNormalizedInput', () => {
		const normalized = normalizeSupportSystemInputUtil(
			createSupportSystemInput,
			new CreateSupportSystemNormalizedInput(),
		);
		expect(normalized).toBeInstanceOf(CreateSupportSystemNormalizedInput);
		expect(normalized).toEqual(
			expect.objectContaining({
				a11yDetails: { NoChimneyPathAvailable: true },
				constructionYear: 1979,
				deleted_at: null,
				geography: {
					coordinates: [52.370302853062604, 4.893996915500548],
					type: 'Point',
				},
				houseNumber: '33',
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				name: '__NAME__',
				objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
				remarks: '__REMARKS__',
				surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
				type: SupportSystemType.Facade,
				typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
			}),
		);
	});

	test('Converts instance of UpdateSupportSystemInput to UpdateSupportSystemNormalizedInput', () => {
		const normalized = normalizeSupportSystemInputUtil(
			updateSupportSystemInput,
			new UpdateSupportSystemNormalizedInput(),
		);
		expect(normalized).toBeInstanceOf(UpdateSupportSystemNormalizedInput);
		expect(normalized).toEqual(
			expect.objectContaining({
				a11yDetails: { NoChimneyPathAvailable: true },
				constructionYear: 1979,
				deleted_at: null,
				geography: {
					coordinates: [52.370302853062604, 4.893996915500548],
					type: 'Point',
				},
				houseNumber: '33',
				id: '1f728e79-1b89-4333-a309-ea93bf17667c',
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				name: '__NAME__',
				objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
				remarks: '__REMARKS__',
				surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
				type: SupportSystemType.Facade,
				typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
			}),
		);
	});
});
