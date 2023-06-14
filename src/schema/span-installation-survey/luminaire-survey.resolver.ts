import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SpanDecompositionType } from '../span-installation/types/span-decomposition-type';

import { LuminaireSurvey } from './models/luminaire-survey.model';
import { LuminaireSurveyService } from './luminaire-survey.service';
import { GetLuminaireSurveyQuery } from './queries/get-luminaire-survey.query';
import { CreateLuminaireSurveyInput } from './dto/create-luminaire-survey.input';
import { CreateLuminaireSurveyCommand } from './commands/create-luminaire-survey.command';
import { LuminaireSurveyFactory } from './luminaire-survey.factory';
import { UpdateLuminaireSurveyCommand } from './commands/update-luminaire-survey.command';
import { UpdateLuminaireSurveyInput } from './dto/update-luminaire-survey.input';
import { GetDecompositionItemDamageQuery } from './queries/get-decomposition-item-damage.query';

@Resolver((of) => LuminaireSurvey)
@Resource(LuminaireSurvey.name)
export class LuminaireSurveyResolver {
	constructor(
		private tensionWireSurveyService: LuminaireSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => LuminaireSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getLuminaireSurvey(@Args('luminaireId') luminaireId: string) {
		return this.queryBus.execute<GetLuminaireSurveyQuery>(new GetLuminaireSurveyQuery(luminaireId));
	}

	@Mutation(() => LuminaireSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createLuminaireSurvey(
		@Args('createLuminaireSurvey') input: CreateLuminaireSurveyInput,
	): Promise<LuminaireSurvey> {
		return LuminaireSurveyFactory.CreateLuminaireSurvey(
			await this.commandBus.execute<CreateLuminaireSurveyCommand>(new CreateLuminaireSurveyCommand(input)),
		);
	}

	@Mutation(() => LuminaireSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateLuminaireSurvey(
		@Args('updateLuminaireSurvey') input: UpdateLuminaireSurveyInput,
	): Promise<LuminaireSurvey> {
		return LuminaireSurveyFactory.CreateLuminaireSurvey(
			await this.commandBus.execute<UpdateLuminaireSurveyCommand>(new UpdateLuminaireSurveyCommand(input)),
		);
	}

	@Query(() => LuminaireSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getLuminaireDamage(@Args('junctionBoxId') luminaireId: string) {
		return this.queryBus.execute<GetDecompositionItemDamageQuery>(
			new GetDecompositionItemDamageQuery(luminaireId, SpanDecompositionType.spanLuminaire),
		);
	}
}
