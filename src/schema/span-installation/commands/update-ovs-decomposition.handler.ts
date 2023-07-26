import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OVSDecompositionRepository } from '../ovs-decomposition.repository';

import { UpdateOVSDecompositionCommand } from './update-ovs-decomposition.command';

@CommandHandler(UpdateOVSDecompositionCommand)
export class UpdateOVSDecompositionHandler implements ICommandHandler<UpdateOVSDecompositionCommand> {
	constructor(private repo: OVSDecompositionRepository) {}

	public async execute(command: UpdateOVSDecompositionCommand): Promise<string> {
		return this.repo.updateOVSDecomposition(command.data);
	}
}
