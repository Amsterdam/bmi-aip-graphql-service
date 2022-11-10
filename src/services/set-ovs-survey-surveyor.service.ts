import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';

import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';

/**
 * npm run console ovs:set-survey-surveyor
 */
@Injectable()
export class SetOVSSurveySurveyorService {
	private static CLI_COMMAND = 'ovs:set-survey-surveyor';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
		private readonly externalAIPGraphQLRepository: ExternalAIPGraphQLRepository,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: SetOVSSurveySurveyorService.CLI_COMMAND,
				description: 'Loops over all OVS surveys and sets the surveyorCompanyId based on the batch executor',
			},
			this.run.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(this.configService.get<string>('GRAPHQL_URL'), {
			headers: {
				Authorization: 'Bearer ' + this.configService.get<string>('AUTH_TOKEN'),
			},
		});
	}

	private async run() {
		this.logger.verbose(`Requesting mutation...`);

		const { setOVSSurveySurveyors } = await this.externalAIPGraphQLRepository.setOVSSurveySurveyors();

		this.logger.verbose('Result:', setOVSSurveySurveyors);
	}
}
