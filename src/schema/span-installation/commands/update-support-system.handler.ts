import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';
import { UpdateSupportSystemNormalizedInput } from '../dto/update-support-system-normalized.input';

import { UpdateSupportSystemCommand } from './update-support-system.command';

@CommandHandler(UpdateSupportSystemCommand)
export class UpdateSupportSystemHandler implements ICommandHandler<UpdateSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: UpdateSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.updateSupportSystem(
			normalizeSupportSystemInputUtil(command.data, new UpdateSupportSystemNormalizedInput()),
		);
	}
}
