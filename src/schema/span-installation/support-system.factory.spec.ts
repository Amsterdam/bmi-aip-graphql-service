import { SupportSystemFactory } from './support-system.factory';
import { domainSupportSystem } from './__stubs__';
import { SupportSystem } from './models/support-system.model';
import { A11yDetails } from './models/a11y-details.model';

describe('Span Installation / SupportSystem / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a SupportSystem GraphQL model', () => {
		const result = SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
		const object = {
			...domainSupportSystem,
			createdAt: domainSupportSystem.created_at ?? null,
			updatedAt: domainSupportSystem.updated_at ?? null,
			deletedAt: domainSupportSystem.deleted_at ?? null,
			constructionYear: domainSupportSystem.constructionYear ?? null,
			houseNumber: domainSupportSystem.houseNumber ?? null,
			type: domainSupportSystem.type ?? null,
			typeDetailed: domainSupportSystem.typeDetailed ?? null,
			installationHeight: 10,
			installationLength: 10,
		};
		delete object.created_at;
		delete object.updated_at;
		delete object.deleted_at;
		delete object.a11yDetails;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(SupportSystem);
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
