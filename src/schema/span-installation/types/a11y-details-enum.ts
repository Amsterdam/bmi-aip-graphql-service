export enum A11yDetails {
	'NormallyAccessible' = 'NormallyAccessible',
	'LimitationOnTheMaximumPermittedAxleLoad' = 'LimitationOnTheMaximumPermittedAxleLoad',
	'LimitationOnTheMaximumHeadroom' = 'LimitationOnTheMaximumHeadroom',
	'LimitationOnTheMaximumVehicleWidth' = 'LimitationOnTheMaximumVehicleWidth',
	'NoChimneyPathAvailable' = 'NoChimneyPathAvailable',
	'Fencing' = 'Fencing',
	'NotAccessibleForAerialPlatform' = 'NotAccessibleForAerialPlatform',
	'KeyNeeded' = 'KeyNeeded',
	'KeySafe' = 'KeySafe',
	'RequestAccess' = 'RequestAccess',
	'TrafficMeasuresNecessary' = 'TrafficMeasuresNecessary',
	'Countersink' = 'Countersink',
	'WorkOnPrivateLand' = 'WorkOnPrivateLand',
	'ThreeMeterDistanceToTramCatenary' = 'ThreeMeterDistanceToTramCatenary',
}

export type CheckedA11yDetails = Partial<Record<A11yDetails, boolean>>;
