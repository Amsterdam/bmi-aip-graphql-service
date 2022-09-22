import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'a11yDetails' })
export class A11yDetails {
	@Field((type) => Boolean, { nullable: true })
	normallyAccessible?: boolean;

	@Field((type) => Boolean, { nullable: true })
	limitationOnTheMaximumPermittedAxleLoad?: boolean;

	@Field((type) => Boolean, { nullable: true })
	limitationOnTheMaximumHeadroom?: boolean;

	@Field((type) => Boolean, { nullable: true })
	limitationOnTheMaximumVehicleWidth?: boolean;

	@Field((type) => Boolean, { nullable: true })
	noChimneyPathAvailable?: boolean;

	@Field((type) => Boolean, { nullable: true })
	fencing?: boolean;

	@Field((type) => Boolean, { nullable: true })
	notAccessibleForAerialPlatform?: boolean;

	@Field((type) => Boolean, { nullable: true })
	keyNeeded?: boolean;

	@Field((type) => Boolean, { nullable: true })
	keySafe?: boolean;

	@Field((type) => Boolean, { nullable: true })
	requestAccess?: boolean;

	@Field((type) => Boolean, { nullable: true })
	trafficMeasuresNecessary?: boolean;

	@Field((type) => Boolean, { nullable: true })
	countersink?: boolean;

	@Field((type) => Boolean, { nullable: true })
	workOnPrivateLand?: boolean;

	@Field((type) => Boolean, { nullable: true })
	threeMeterDistanceToTramCatenary?: boolean;
}
