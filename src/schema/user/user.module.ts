import { forwardRef, Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { PrismaService } from '../../prisma.service';

// @Global()
@Module({
	providers: [UserService, UserRepository, PrismaService],
	exports: [UserService, UserRepository],
	imports: [forwardRef(() => AuthorizationModule)],
})
export class UserModule {}
