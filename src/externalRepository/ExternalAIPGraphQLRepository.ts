import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'apollo-server-express';

import { CreateObjectInput } from '../schema/object/dto/create-object.input';
import { ObjectModel } from '../schema/object/models/object.model';
import { CreateSurveyInput } from '../schema/survey/dto/create-survey.input';
import { Survey } from '../schema/survey/models/survey.model';
import { CreateLuminaireInput } from '../schema/span-installation/dto/create-luminaire.input';
import { Luminaire } from '../schema/span-installation/models/luminaire.model';
import { CreateJunctionBoxInput } from '../schema/span-installation/dto/create-junction-box.input';

import { ExternalAIPGraphQLRequest } from './ExternalAIPGraphQLRequest';

@Injectable()
export class ExternalAIPGraphQLRepository {
	public constructor(
		private readonly logger: Logger,
		private readonly configService: ConfigService,
		@InjectGraphQLClient() private readonly graphqlClient: GraphQLClient,
	) {}

	public async createObject(input: CreateObjectInput): Promise<ObjectModel> {
		const mutation = gql`
			mutation createObject($input: CreateObjectInput!) {
				createObject(createObject: $input) {
					id
				}
			}
		`;

		return this.executeGraphQLRequest(mutation, input);
	}

	public async createSurvey(input: CreateSurveyInput): Promise<Survey> {
		const mutation = gql`
			mutation createSurvey($input: CreateSurveyInput!) {
				createSurvey(createSurvey: $input) {
					id
				}
			}
		`;

		return this.executeGraphQLRequest(mutation, input);
	}

	public async createLuminaire(input: CreateLuminaireInput): Promise<Luminaire> {
		const mutation = gql`
			mutation createLuminaire($input: CreateLuminaireInput!) {
				createLuminaire(createLuminaire: $input) {
					id
				}
			}
		`;

		return this.executeGraphQLRequest(mutation, input);
	}

	public async createJunctionBox(input: CreateJunctionBoxInput): Promise<Survey> {
		const mutation = gql`
			mutation createJunctionBox($input: CreateJunctionBoxInput!) {
				createJunctionBox(createJunctionBox: $input) {
					id
				}
			}
		`;

		return this.executeGraphQLRequest(mutation, input);
	}

	private async executeGraphQLRequest(mutation, input): Promise<any> {
		try {
			const result = await this.graphqlClient.request<ExternalAIPGraphQLRequest>(mutation, {
				input: input,
			});
			const propertyName = Object.getOwnPropertyNames(result)[0];
			console.log(`New entry introduced for ${propertyName} with ID ${result[propertyName].id}`);

			return result[propertyName];
		} catch (e) {
			console.log(`Failed to create new entry, error: ${e.message}`);

			return;
		}
	}
}
