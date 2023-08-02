import { Prisma } from '@prisma/client';

import { IPassport } from '../../../schema/asset/models/passport.model';

export type OVSExportSpanInstallationBaseData = {
	id: string;
	name: string;
	code: string;
	location: string;
	latitude: Prisma.Decimal;
	longitude: Prisma.Decimal;
	attributes: IPassport;
};

export type OVSExportSpanInstallationWithBatchDetails = OVSExportSpanInstallationBaseData & {
	batch: {
		name: string;
		status: string;
	};
};
