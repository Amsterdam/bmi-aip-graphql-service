import { Field } from '@nestjs/graphql';

export class IPassport {
	@Field((type) => String, { nullable: true })
	passportIdentification: string;

	@Field((type) => String, { nullable: true })
	passportCityArea: string;

	@Field((type) => String, { nullable: true })
	passportDistrict: string;

	@Field((type) => String, { nullable: true })
	passportNeighborhood: string;

	@Field((type) => String, { nullable: true })
	passportStreet: string;

	@Field((type) => Number, { nullable: true })
	passportYear: number;

	@Field((type) => Number, { nullable: true })
	passportPowerSupplies?: number;

	@Field((type) => Boolean, { nullable: true })
	passportSplits: boolean;

	@Field((type) => Boolean, { nullable: true })
	passportDoubleWired: boolean;

	@Field((type) => Boolean, { nullable: true })
	tramTracks: boolean;

	@Field((type) => String, { nullable: true })
	notes: string;
}
