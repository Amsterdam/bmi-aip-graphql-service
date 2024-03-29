import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient } from 'graphql-request';
import { gql } from 'apollo-server-express';

import { CreateSurveyInput } from '../schema/survey/dto/create-survey.input';
import { Survey } from '../schema/survey/models/survey.model';
import { CreateLuminaireInput } from '../schema/span-installation/dto/create-luminaire.input';
import { Luminaire } from '../schema/span-installation/models/luminaire.model';
import { CreateJunctionBoxInput } from '../schema/span-installation/dto/create-junction-box.input';
import { SupportSystem } from '../schema/span-installation/models/support-system.model';
import { JunctionBox } from '../schema/span-installation/models/junction-box.model';
import { CreateSupportSystemInput } from '../schema/span-installation/dto/create-support-system.input';
import { AdditionalPropsForOVSExportInput } from '../schema/span-installation/dto/additional-props-for-ovs-export.input';

import { ExternalAIPGraphQLRequest } from './ExternalAIPGraphQLRequest';

@Injectable()
export class ExternalAIPGraphQLRepository {
	public constructor(
		private readonly logger: Logger,
		private readonly configService: ConfigService,
		@InjectGraphQLClient() private readonly graphqlClient: GraphQLClient,
	) {}

	public async createSurvey(input: CreateSurveyInput): Promise<Survey> {
		const mutation = gql`
			mutation createSurvey($input: CreateSurveyInput!) {
				createSurvey(createSurveyInput: $input) {
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

	public async createJunctionBox(input: CreateJunctionBoxInput): Promise<JunctionBox> {
		const mutation = gql`
			mutation createJunctionBox($input: CreateJunctionBoxInput!) {
				createJunctionBox(createJunctionBox: $input) {
					id
				}
			}
		`;

		return this.executeGraphQLRequest(mutation, input);
	}

	public async createSupportSystem(input: CreateSupportSystemInput): Promise<SupportSystem> {
		const mutation = gql`
			mutation createSupportSystem($input: CreateSupportSystemInput!) {
				createSupportSystem(createSupportSystem: $input) {
					id
				}
			}
		`;

		return this.executeGraphQLRequest(mutation, input);
	}

	public async undoOVSImport(): Promise<any> {
		const mutation = gql`
			mutation undoOVSImport {
				undoOVSImport {
					success
				}
			}
		`;

		return this.graphqlClient.request<ExternalAIPGraphQLRequest>(mutation);
	}

	public async setOVSSurveySurveyors(): Promise<ExternalAIPGraphQLRequest> {
		const mutation = gql`
			mutation setOVSSurveySurveyors {
				setOVSSurveySurveyors {
					done
					errors
					log
					companyIds
				}
			}
		`;

		return this.graphqlClient.request<ExternalAIPGraphQLRequest>(mutation);
	}

	public async removeDuplicateInstallationGroup(
		installationGroupId: number,
		targetRemoved?: boolean,
	): Promise<boolean> {
		const mutation = gql`
			mutation removeDuplicateInstallationGroup($installationGroupId: Float!, $targetRemoved: Boolean!) {
				removeDuplicateInstallationGroup(
					installationGroupId: $installationGroupId
					targetRemoved: $targetRemoved
				)
			}
		`;

		const result = await this.graphqlClient.request(mutation, {
			installationGroupId: installationGroupId,
			targetRemoved: targetRemoved ? targetRemoved : false,
		});

		return result?.removeDuplicateInstallationGroup;
	}

	public async setAdditionalPropsForOVSExport(
		input: Partial<AdditionalPropsForOVSExportInput>,
	): Promise<ExternalAIPGraphQLRequest> {
		const mutation = gql`
			mutation setAdditionalPropsForOVSExport($input: AdditionalPropsForOVSExportInput!) {
				setAdditionalPropsForOVSExport(setAdditionalPropsForOVSExport: $input) {
					success
				}
			}
		`;

		return this.graphqlClient.request<ExternalAIPGraphQLRequest>(mutation, { input });
	}

	public async findObjectsWithNen2767Decomposition(): Promise<ExternalAIPGraphQLRequest> {
		// TODO rename `findObjectsWithNen2767Decomposition` to `objectsWithNen2767Decomposition`
		const query = gql`
			query findObjectsWithNen2767Decomposition {
				findObjectsWithNen2767Decomposition {
					id
					code
				}
			}
		`;
		return this.graphqlClient.request<ExternalAIPGraphQLRequest>(query);
	}

	public async migrateNen2767DecompositionForObject(objectId: string): Promise<ExternalAIPGraphQLRequest> {
		const mutation = gql`
			mutation migrateNen2767Decomposition($objectId: String!) {
				migrateNen2767Decomposition(objectId: $objectId) {
					errors
					log
					failedSurveyIds
					successSurveyIds
				}
			}
		`;
		return this.graphqlClient.request<ExternalAIPGraphQLRequest>(mutation, {
			objectId,
		});
	}

	public async findObjectsWithMaintenanceMeasures(): Promise<ExternalAIPGraphQLRequest> {
		const query = gql`
			query findObjectsWithMaintenanceMeasures {
				objectsWithMaintenanceMeasures {
					id
					code
				}
			}
		`;
		return this.graphqlClient.request<ExternalAIPGraphQLRequest>(query);
	}

	public async migrateMaintenanceMeasures(objectId: string): Promise<ExternalAIPGraphQLRequest> {
		const mutation = gql`
			mutation migrateMaintenanceMeasures($objectId: String!) {
				migrateMaintenanceMeasures(objectId: $objectId) {
					errors
					log
					failedSurveyIds
					successSurveyIds
				}
			}
		`;
		return this.graphqlClient.request<ExternalAIPGraphQLRequest>(mutation, {
			objectId,
		});
	}

	private async executeGraphQLRequest(mutation, input): Promise<any> {
		try {
			const result = await this.graphqlClient.request<ExternalAIPGraphQLRequest>(mutation, {
				input: input,
			});
			const propertyName = Object.getOwnPropertyNames(result)[0];
			// console.log(`New entry introduced for ${propertyName} with ID ${result[propertyName].id}`);
			return result[propertyName];
		} catch (e) {
			console.log(`Failed to create new entry, error: ${e.message}`);
			// Re-throw so that it can be caught by the caller
			throw e;
		}
	}
}
