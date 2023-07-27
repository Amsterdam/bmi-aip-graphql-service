import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JunctionBox } from 'src/schema/span-installation/types/junction-box.repository.interface';
import { ExcelJunctionBoxProps, ExcelLuminaireProps } from 'src/services/types/excelRowObject';
import { SupportSystemType } from 'src/schema/span-installation/types';
import { SupportSystem } from 'src/schema/span-installation/types/support-system.repository.interface';
import { Luminaire } from 'src/schema/span-installation/types/luminaire.repository.interface';

import { DbObject } from '../object/types/object.repository.interface';

import { AdditionalPropsForOVSExportInput } from './dto/additional-props-for-ovs-export.input';

@Injectable()
export class AdditionalPropsForOVSExportRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async setAdditionalPropsForOVSExport(input: AdditionalPropsForOVSExportInput): Promise<string> {
		const { installationGroup, source } = input;

		try {
			const name = 'OVS' + ('000' + installationGroup).slice(-4);
			const object: DbObject = await this.prisma.objects.findFirst({ where: { name } });
			const junctionBoxes: JunctionBox[] = await this.prisma.spanJunctionBoxes.findMany({
				where: { objectId: object.id },
			});
			const supportSystem: SupportSystem = await this.prisma.spanSupportSystems.findFirst({
				where: { objectId: object.id, type: SupportSystemType.TensionWire },
			});
			const luminaires: Luminaire[] = await this.prisma.spanLuminaires.findMany({
				where: { supportSystemId: supportSystem.id },
			});

			await Promise.all(
				luminaires.map(async (lm, idx) => {
					const sourceLm: ExcelLuminaireProps = source.supportSystems[0].luminaires[idx];

					// Update spanLuminaires sphere
					await this.prisma.spanLuminaires.update({
						where: { id: lm.id },
						data: {
							sphere: sourceLm['Aanp. K-Hang/Bol (contract 3)'],
						},
					});
				}),
			);

			await Promise.all(
				junctionBoxes.map(async (jb, idx) => {
					const sourceJb: ExcelJunctionBoxProps = source.junctionBoxes[idx];

					// Update spanJunctionBoxes techViewId and mastId
					await this.prisma.spanJunctionBoxes.updateMany({
						where: {
							objectId: object.id,
							mastNumber: sourceJb.Mastgetal,
						},
						data: {
							mastId: sourceJb['Id-mast (niet weergeven, tbv export)'],
							techViewId: sourceJb['Techview Id'],
						},
					});
				}),
			);
		} catch (err) {
			return err.message;
		}

		return 'SUCCESS';
	}
}
