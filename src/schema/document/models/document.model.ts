import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Document {
	@Field((type) => String)
	public id: string;

	@Field((type) => String)
	public url: string;

	@Field((type) => String)
	public assetCode: string;

	@Field((type) => String)
	public fileName: string;
}
