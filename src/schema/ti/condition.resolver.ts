import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { Condition } from './models/condition.model';
import { ConditionFactory } from './condition.factory';
import { ConditionService } from './condition.service';
import { CreateConditionInput } from './dto/create-condition.input';
import { UpdateConditionInput } from './dto/update-condition.input';
import { CreateConditionCommand } from './commands/create-condition.command';
import { UpdateConditionCommand } from './commands/update-condition.command';
import { Condition as DomainCondition } from './types/condition.repository.interface';

@Resolver((of) => Condition)
@Resource(Condition.name)
export class ConditionResolver {
	constructor(private conditionService: ConditionService, private commandBus: CommandBus) {}

	@Mutation(() => Condition)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createCondition(@Args('createCondition') input: CreateConditionInput): Promise<Condition> {
		const domainCondition: DomainCondition = await this.commandBus.execute<CreateConditionCommand>(
			new CreateConditionCommand(input),
		);
		return ConditionFactory.CreateCondition(domainCondition);
	}

	@Mutation(() => Condition)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateCondition(@Args('updateCondition') input: UpdateConditionInput): Promise<Condition> {
		const domainCondition: DomainCondition = await this.commandBus.execute<UpdateConditionCommand>(
			new UpdateConditionCommand(input),
		);
		return ConditionFactory.CreateCondition(domainCondition);
	}

	@Query((returns) => [Condition], { name: 'conditions' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	async getCondition(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.conditionService.getCondition(surveyId);
	}
}
