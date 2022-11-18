import { Prisma } from '@prisma/client';

import { GeographyRD } from './models/geography-rd.model';

export class GeographyRDFactory {
	static CreateGeographyRDFromJSONB(geographyRD: Prisma.JsonValue): GeographyRD {
		const geographyRDModel = new GeographyRD();
		const parsedGeographyRD = geographyRD as GeographyRD;
		geographyRDModel.x = parsedGeographyRD?.x ?? 0;
		geographyRDModel.y = parsedGeographyRD?.y ?? 0;

		return geographyRDModel;
	}
}
