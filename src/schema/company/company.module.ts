import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
	providers: [CompanyRepository, CompanyService, PrismaService],
	exports: [CompanyService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class CompanyModule {}
