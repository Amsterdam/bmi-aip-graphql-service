import { Injectable } from '@nestjs/common';

import { Element } from './models/element.model';
import { ElementFactory } from './element.factory';
import { ElementRepository } from './element.repository';

@Injectable()
export class ElementService {
	public constructor(private readonly elementRepo: ElementRepository) {}

	async getElements(surveyId: string): Promise<Element[]> {
		return (await this.elementRepo.getElements(surveyId)).map((element) => ElementFactory.CreateElement(element));
	}
}
