import { Prisma } from '@prisma/client';

const spanInstallations = Prisma.validator<Prisma.objectsArgs>()({
	select: {
		id: true,
	},
});

export type SpanInstallation = Prisma.objectsGetPayload<typeof spanInstallations>;

export interface SpanInstallationExportRepository {
	findSpanInstallations(): Promise<SpanInstallation[]>;
}
