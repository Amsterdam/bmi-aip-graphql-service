import { SupportSystemType, SupportSystemTypeDetailedFacade } from '../types';

import { SupportSystem } from './support-system.model';
import { A11yDetails } from './a11y-details.model';

describe('Span Installation / Model / SupportSystem', () => {
	test('constructs a SupportSystem instance', () => {
		const supportSystem = new SupportSystem();
		const a11yDetails = new A11yDetails();
		a11yDetails.limitationOnTheMaximumHeadroom = true;
		supportSystem.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		supportSystem.objectId = 'cecc214d-1c44-4bcd-94e2-f2d661327db3';
		supportSystem.surveyId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		supportSystem.name = '__NAME__';
		supportSystem.type = SupportSystemType.Facade;
		supportSystem.typeDetailed = SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs;
		supportSystem.location = null;
		supportSystem.constructionYear = 1979;
		supportSystem.locationIndication = '__LOCATION__INDICATION__';
		supportSystem.a11yDetails = a11yDetails;
		supportSystem.installationHeight = 320;
		supportSystem.installationLength = 6000;
		supportSystem.remarks = '__REMARKS__';
		supportSystem.houseNumber = '33';
		supportSystem.geography = {
			type: 'Point',
			coordinates: [52.37593907780107, 4.894690444015065],
		};
		supportSystem.geographyRD = {
			type: 'Point',
			coordinates: [116211.88, 487352.77],
		};
		supportSystem.createdAt = '2022-08-02T15:51:54.044Z';
		supportSystem.updatedAt = '2022-08-02T15:52:54.044Z';
		supportSystem.deletedAt = '2022-08-02T15:53:07.441Z';

		expect(supportSystem).toBeInstanceOf(SupportSystem);
		expect(supportSystem).toEqual({
			name: '__NAME__',
			a11yDetails: { limitationOnTheMaximumHeadroom: true },
			constructionYear: 1979,
			createdAt: '2022-08-02T15:51:54.044Z',
			deletedAt: '2022-08-02T15:53:07.441Z',
			geography: {
				coordinates: [52.37593907780107, 4.894690444015065],
				type: 'Point',
			},
			geographyRD: {
				coordinates: [116211.88, 487352.77],
				type: 'Point',
			},
			houseNumber: '33',
			id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
			installationHeight: 320,
			installationLength: 6000,
			location: null,
			locationIndication: '__LOCATION__INDICATION__',
			objectId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
			remarks: '__REMARKS__',
			surveyId: '388ecaaa-c6c2-4613-aa14-f206cf577ca7',
			type: SupportSystemType.Facade,
			typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
			updatedAt: '2022-08-02T15:52:54.044Z',
		});
	});
});
