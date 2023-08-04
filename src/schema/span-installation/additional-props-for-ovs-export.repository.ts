import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { ExcelJunctionBoxProps, ExcelLuminaireProps } from '../../services/types/excelRowObject';

import { JunctionBox } from './types/junction-box.repository.interface';
import { SupportSystemType } from './types';
import { SupportSystem } from './types/support-system.repository.interface';
import { Luminaire } from './types/luminaire.repository.interface';
import { AdditionalPropsForOVSExportInput } from './dto/additional-props-for-ovs-export.input';

@Injectable()
export class AdditionalPropsForOVSExportRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async setAdditionalPropsForOVSExport(input: AdditionalPropsForOVSExportInput): Promise<string> {
		const { installationGroup, source } = input;

		try {
			const name = 'OVS' + ('000' + installationGroup).slice(-4);
			const object = await this.prisma.objects.findFirst({ where: { name } });
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
