import { A11yDetails } from './a11y-details.model';

describe('Span Installation / Model / A11yDetails', () => {
	test('constructs a A11yDetails instance', () => {
		const a11yDetails = new A11yDetails();
		a11yDetails.limitationOnTheMaximumHeadroom = true;
		a11yDetails.countersink = true;
		a11yDetails.fencing = false;
		a11yDetails.keyNeeded = true;
		a11yDetails.keySafe = true;
		a11yDetails.limitationOnTheMaximumPermittedAxleLoad = true;
		a11yDetails.limitationOnTheMaximumVehicleWidth = true;
		a11yDetails.noChimneyPathAvailable = true;
		a11yDetails.normallyAccessible = true;
		a11yDetails.notAccessibleForAerialPlatform = true;
		a11yDetails.threeMeterDistanceToTramCatenary = true;
		a11yDetails.trafficMeasuresNecessary = true;
		a11yDetails.workOnPrivateLand = false;

		expect(a11yDetails).toBeInstanceOf(A11yDetails);
		expect(a11yDetails).toEqual({
			countersink: true,
			fencing: false,
			keyNeeded: true,
			keySafe: true,
			limitationOnTheMaximumHeadroom: true,
			limitationOnTheMaximumPermittedAxleLoad: true,
			limitationOnTheMaximumVehicleWidth: true,
			noChimneyPathAvailable: true,
			normallyAccessible: true,
			notAccessibleForAerialPlatform: true,
			threeMeterDistanceToTramCatenary: true,
			trafficMeasuresNecessary: true,
			workOnPrivateLand: false,
		});
	});
});
