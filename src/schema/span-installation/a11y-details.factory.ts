import { Prisma } from '@prisma/client';

import { A11yDetails } from './models/a11y-details.model';

export class A11yDetailsFactory {
	static CreateA11yDetailsFromJSONB(a11yDetails: Prisma.JsonValue): A11yDetails {
		const a11yDetailsModel = new A11yDetails();
		const parsedA11yDetails = a11yDetails as A11yDetails;
		a11yDetailsModel.normallyAccessible = parsedA11yDetails?.normallyAccessible ?? false;
		a11yDetailsModel.limitationOnTheMaximumPermittedAxleLoad =
			parsedA11yDetails?.limitationOnTheMaximumPermittedAxleLoad ?? false;
		a11yDetailsModel.limitationOnTheMaximumHeadroom = parsedA11yDetails?.limitationOnTheMaximumHeadroom ?? false;
		a11yDetailsModel.limitationOnTheMaximumVehicleWidth =
			parsedA11yDetails?.limitationOnTheMaximumVehicleWidth ?? false;
		a11yDetailsModel.noChimneyPathAvailable = parsedA11yDetails?.noChimneyPathAvailable ?? false;
		a11yDetailsModel.fencing = parsedA11yDetails?.fencing ?? false;
		a11yDetailsModel.notAccessibleForAerialPlatform = parsedA11yDetails?.notAccessibleForAerialPlatform ?? false;
		a11yDetailsModel.keyNeeded = parsedA11yDetails?.keyNeeded ?? false;
		a11yDetailsModel.keySafe = parsedA11yDetails?.keySafe ?? false;
		a11yDetailsModel.requestAccess = parsedA11yDetails?.requestAccess ?? false;
		a11yDetailsModel.trafficMeasuresNecessary = parsedA11yDetails?.trafficMeasuresNecessary ?? false;
		a11yDetailsModel.countersink = parsedA11yDetails?.countersink ?? false;
		a11yDetailsModel.workOnPrivateLand = parsedA11yDetails?.workOnPrivateLand ?? false;
		a11yDetailsModel.threeMeterDistanceToTramCatenary =
			parsedA11yDetails?.threeMeterDistanceToTramCatenary ?? false;
		return a11yDetailsModel;
	}
}
