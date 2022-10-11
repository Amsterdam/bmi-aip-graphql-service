export class RemoveDuplicateInstallationGroupCommand {
	public constructor(public readonly installationGroupId: number, public readonly targetRemoved?: boolean) {}
}
