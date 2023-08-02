import { JunctionBoxFactory } from './junction-box.factory';
import { domainJunctionBox } from './__stubs__';
import { JunctionBox } from './models/junction-box.model';
import { A11yDetails } from './models/a11y-details.model';

describe('Span Installation / JunctionBox / Factory', () => {
	test('CreateJunctionBox() constructs an instance of a JunctionBox GraphQL model', () => {
		const result = JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
		const object = {
			...domainJunctionBox,
			createdAt: domainJunctionBox.created_at ?? null,
			updatedAt: domainJunctionBox.updated_at ?? null,
			deletedAt: domainJunctionBox.deleted_at ?? null,
			mastNumber: Number(domainJunctionBox.mastNumber),
			installationHeight: 10,
		};
		delete object.created_at;
		delete object.updated_at;
		delete object.deleted_at;
		delete object.a11yDetails;
		delete object.techViewId;
		delete object.mastId;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(JunctionBox);
		expect(result.a11yDetails).toBeInstanceOf(A11yDetails);
		expect(result.a11yDetails).toEqual({
			countersink: false,
			fencing: false,
			keyNeeded: false,
			keySafe: false,
			limitationOnTheMaximumHeadroom: true,
			limitationOnTheMaximumPermittedAxleLoad: false,
			limitationOnTheMaximumVehicleWidth: false,
			noChimneyPathAvailable: false,
			normallyAccessible: false,
			notAccessibleForAerialPlatform: false,
			requestAccess: false,
			threeMeterDistanceToTramCatenary: false,
			trafficMeasuresNecessary: false,
			workOnPrivateLand: false,
		});
	});
});
