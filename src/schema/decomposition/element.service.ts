import { Injectable } from '@nestjs/common';

import { Element } from './models/element.model';
import { ElementFactory } from './element.factory';
import { ElementRepository } from './element.repository';
import { ElementHasUnitsException } from './exceptions/element-has-units.exception';

@Injectable()
export class ElementService {
	public constructor(private readonly elementRepo: ElementRepository) {}

	async getElements(surveyId: string): Promise<Element[]> {
		return (await this.elementRepo.getElements(surveyId)).map((element) => ElementFactory.CreateElement(element));
	}

	public async deleteElement(elementId: string): Promise<Element> {
		// It is not allowed to delete elements with units
		const hasUnits = await this.elementRepo.hasUnits(elementId);
		if (hasUnits) {
			throw new ElementHasUnitsException(elementId);
		}

		return ElementFactory.CreateElement(await this.elementRepo.deleteElement(elementId));
	}

	async getElementById(elementId: string): Promise<Element> {
		return ElementFactory.CreateElement(await this.elementRepo.getElementById(elementId));
	}
}
