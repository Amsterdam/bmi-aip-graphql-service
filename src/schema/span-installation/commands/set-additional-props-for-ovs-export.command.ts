import { AdditionalPropsForOVSExportInput } from '../dto/additional-props-for-ovs-export.input';

export class SetAdditionalPropsForOVSExportCommand {
	public constructor(public readonly data: AdditionalPropsForOVSExportInput) {}
}
