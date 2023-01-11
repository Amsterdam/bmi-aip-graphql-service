import { A11yDetailsFactory } from './a11y-details.factory';

describe('Span Installation / A11yDetails / Factory', () => {
	test('CreateJunctionBox() constructs an instance of a JunctionBox GraphQL model', () => {
		const result = A11yDetailsFactory.CreateA11yDetailsFromJSONB({
			notAccessibleForAerialPlatform: true,
		});
		expect(result).toEqual({
			countersink: false,
			fencing: false,
			keyNeeded: false,
			keySafe: false,
			limitationOnTheMaximumHeadroom: false,
			limitationOnTheMaximumPermittedAxleLoad: false,
			limitationOnTheMaximumVehicleWidth: false,
			noChimneyPathAvailable: false,
			normallyAccessible: false,
			notAccessibleForAerialPlatform: true,
			requestAccess: false,
			threeMeterDistanceToTramCatenary: false,
			trafficMeasuresNecessary: false,
			workOnPrivateLand: false,
		});
	});
});
