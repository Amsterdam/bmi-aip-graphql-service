import { InputType } from '@nestjs/graphql';

import { CreateManifestationInput } from './create-manifestation.input';

@InputType()
export class UpdateManifestationInput extends CreateManifestationInput {}
