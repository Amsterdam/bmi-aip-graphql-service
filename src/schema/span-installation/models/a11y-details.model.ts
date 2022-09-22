import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'a11yDetails' })
export class A11yDetails {
	@Field((type) => Boolean)
	normallyAccessible?: boolean;

	@Field((type) => Boolean)
	limitationOnTheMaximumPermittedAxleLoad?: boolean;

	@Field((type) => Boolean)
	limitationOnTheMaximumHeadroom?: boolean;

	@Field((type) => Boolean)
	limitationOnTheMaximumVehicleWidth?: boolean;

	@Field((type) => Boolean)
	noChimneyPathAvailable?: boolean;

	@Field((type) => Boolean)
	fencing?: boolean;

	@Field((type) => Boolean)
	notAccessibleForAerialPlatform?: boolean;

	@Field((type) => Boolean)
	keyNeeded?: boolean;

	@Field((type) => Boolean)
	keySafe?: boolean;

	@Field((type) => Boolean)
	requestAccess?: boolean;

	@Field((type) => Boolean)
	trafficMeasuresNecessary?: boolean;

	@Field((type) => Boolean)
	countersink?: boolean;

	@Field((type) => Boolean)
	workOnPrivateLand?: boolean;

	@Field((type) => Boolean)
	threeMeterDistanceToTramCatenary?: boolean;
}
