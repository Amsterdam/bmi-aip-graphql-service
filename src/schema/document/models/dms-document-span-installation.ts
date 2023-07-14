import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class DMSDocumentSpanInstallation {
	@Field((type) => String)
	public guid: string;

	@Field((type) => String)
	public name: string;

	@Field((type) => String)
	public volgnummer: string;

	@Field((type) => String)
	public onderdeel: string;

	@Field((type) => String)
	public mime_type: string;

	@Field((type) => String)
	public extension: string;

	@Field((type) => String)
	public pid: string;

	@Field((type) => Number)
	public size: number;

	@Field((type) => String)
	public url: string;

	@Field((type) => String)
	public bron_bruggen: string;

	@Field((type) => String)
	public vertrouwelijkheid: string;

	@Field((type) => String)
	public onderdeel_id: string;

	@Field((type) => String)
	public ingenieursbureau_bruggen: string;

	@Field((type) => String)
	public documentomschrijving: string;

	@Field((type) => String)
	public survey_id_overspanning: string;

	@Field((type) => String)
	public datum: string;

	@Field((type) => String)
	public actueel: string;

	@Field((type) => GraphQLJSON, { nullable: true })
	rawMetadata?: JSON;
}
