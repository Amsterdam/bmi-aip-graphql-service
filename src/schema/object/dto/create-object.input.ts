import { InputType } from '@nestjs/graphql';

import { BaseObjectInput } from './base-object.input';

@InputType()
export class CreateObjectInput extends BaseObjectInput {}
