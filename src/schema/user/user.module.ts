import { forwardRef, Module } from '@nestjs/common';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { PrismaService } from '../../prisma.service';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
	providers: [UserService, UserRepository, PrismaService],
	exports: [UserService, UserRepository],
	imports: [forwardRef(() => AuthorizationModule)],
})
export class UserModule {}
