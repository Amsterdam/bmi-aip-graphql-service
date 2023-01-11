import { InputType } from '@nestjs/graphql';

import { BaseAssetInput } from './base-asset.input';

@InputType()
export class CreateAssetInput extends BaseAssetInput {}
