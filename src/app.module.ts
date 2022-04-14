import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecompositionModule } from './schema/decomposition/decomposition.module';
import { PrismaService } from './prisma.service';
import { Batch as BatchModule } from './schema/batch/batch.module';

@Module({
	imports: [
		DecompositionModule,
		BatchModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: true,
			playground: true,
			sortSchema: true,
			autoSchemaFile: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
