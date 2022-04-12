import { ElementsService } from './elements.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard, Public, Resource } from 'nest-keycloak-connect';
import { Element } from './models/element.model';

@Controller('events')
@UseGuards(AuthGuard)
@Resource(Element.name)
export class ElementsController {
	constructor(private service: ElementsService) {}

	@Public()
	@Get()
	async getSurveyElements(@Param('surveyId') surveyId: string, @Param('code') code?: number) {
		console.log('w00t!', surveyId);
		return await this.service.getElements(surveyId, code);
	}
}
