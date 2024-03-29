import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { Defect, IDefectRepository } from './types/defect.repository.interface';

@Injectable()
export class DefectRepository implements IDefectRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async getDefect(defectId: string): Promise<Defect | null> {
		return this.prisma.defects.findUnique({
			where: {
				id: defectId,
			},
		});
	}
}
