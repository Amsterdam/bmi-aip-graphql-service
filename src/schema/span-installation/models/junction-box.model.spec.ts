import { JunctionBox } from './junction-box.model';

describe('Span Installation / Model / JunctionBox', () => {
	test('constructs a JunctionBox instance', () => {
		const junctionBox = new JunctionBox();
		junctionBox.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		junctionBox.objectId = 'cecc214d-1c44-4bcd-94e2-f2d661327db3';
		junctionBox.surveyId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		junctionBox.name = '__NAME__';
		junctionBox.mastNumber = 33;
		junctionBox.location = null;
		junctionBox.locationIndication = '__LOCATION__INDICATION__';
		junctionBox.a11yDetails = '__A11Y_DETAILS__';
		junctionBox.installationHeight = 320;
		junctionBox.riserTubeVisible = false;
		junctionBox.remarks = '__REMARKS__';
		junctionBox.geography = {
			type: 'Point',
			coordinates: [52.37593907780107, 4.894690444015065],
		};
		junctionBox.createdAt = '2022-08-02T15:51:54.044Z';
		junctionBox.updatedAt = '2022-08-02T15:52:54.044Z';
		junctionBox.deletedAt = '2022-08-02T15:53:07.441Z';

		expect(junctionBox).toBeInstanceOf(JunctionBox);
		expect(junctionBox).toEqual({
			a11yDetails: '__A11Y_DETAILS__',
			createdAt: '2022-08-02T15:51:54.044Z',
			deletedAt: '2022-08-02T15:53:07.441Z',
			geography: {
				coordinates: [52.37593907780107, 4.894690444015065],
				type: 'Point',
			},
			id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
			installationHeight: 320,
			location: null,
			locationIndication: '__LOCATION__INDICATION__',
			mastNumber: 33,
			name: '__NAME__',
			objectId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
			remarks: '__REMARKS__',
			riserTubeVisible: false,
			surveyId: '388ecaaa-c6c2-4613-aa14-f206cf577ca7',
			updatedAt: '2022-08-02T15:52:54.044Z',
		});
	});
});
