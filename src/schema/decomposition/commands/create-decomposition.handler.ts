import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GisibRepository } from '../../../gisib/gisib.repository';
import { AssetFactory } from '../../asset/asset.factory';
import { AssetRepository } from '../../asset/asset.repository';
import { ElementFactory } from '../element.factory';
import { ElementRepository } from '../element.repository';
import { UnitRepository } from '../unit.repository';
import { UnitFactory } from '../unit.factory';
import { GisibAsset } from '../../../gisib/types/GisibAsset';
import { GisibFeature } from '../../../gisib/types/GisibFeature';
import { GisibElement } from '../../../gisib/types/GisibElement';

import { CreateDecompositionCommand } from './create-decomposition.command';

@CommandHandler(CreateDecompositionCommand)
export class CreateDecompositionHandler implements ICommandHandler<CreateDecompositionCommand> {
	constructor(
		private gisibRepository: GisibRepository,
		private assetRepository: AssetRepository,
		private elementRepository: ElementRepository,
		private unitRepository: UnitRepository,
	) {}

	public async createElementWithUnits(
		objectId: string,
		surveyId: string,
		element: GisibFeature<GisibElement>,
	): Promise<void> {
		const { id: elementId, gisibId } = await this.elementRepository.createElement(
			ElementFactory.CreateElementInput(objectId, surveyId, element),
		);

		const units = await this.gisibRepository.getElementUnits(gisibId);
		await Promise.all(
			units.map((unit) =>
				this.unitRepository.createUnit(UnitFactory.CreateUnitInput(objectId, surveyId, elementId, unit)),
			),
		);
	}

	public async execute({ assetCode, surveyId }: CreateDecompositionCommand): Promise<void> {
		const domainAsset: GisibFeature<GisibAsset> | undefined = await this.gisibRepository.getAssetByCode(assetCode);
		const asset = AssetFactory.FromGisibAsset(domainAsset);

		const { id: objectId } = await this.assetRepository.getAssetByCode(assetCode);
		const elements = await this.gisibRepository.getAssetElements(asset.gisibId);
		await Promise.all(elements.map((element) => this.createElementWithUnits(objectId, surveyId, element)));
	}
}
