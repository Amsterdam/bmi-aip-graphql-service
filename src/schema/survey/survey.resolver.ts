import { Args, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../prisma.service';

import { Survey } from './models/survey.model';

/*
	This resolver is just for illustrating
	that the prisma implementation is working, Maybe can removed in future
*/

@Resolver((of) => Survey)
export class SurveyResolver {
	public constructor(private readonly prismaService: PrismaService) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@Query((returns) => Survey, { name: 'surveys' })
	public async getSurveyById(@Args('id') id: string): Promise<Survey> {
		const survey = this.prismaService.surveys.findUnique({
			where: { id: id },
		});
		if (!survey) {
			throw new Error('Method not implemented.');
		}

		return survey;
	}
}
