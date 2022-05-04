import { forwardRef, Module } from '@nestjs/common';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';

import { ElementsService } from './elements.service';
import { ElementsResolver } from './elements.resolver';

@Module({
	providers: [ElementsResolver, ElementsService],
	imports: [AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class DecompositionModule {}
