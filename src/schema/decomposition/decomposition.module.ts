import { forwardRef, Module } from '@nestjs/common';

import { ElementsResolver } from './elements.resolver';
import { ElementsService } from './elements.service';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AssetModule } from '../asset/asset.module';

@Module({
	providers: [ElementsResolver, ElementsService],
	imports: [AuthorizationModule, AuthenticationModule, forwardRef(() => AssetModule)],
})
export class DecompositionModule {}
