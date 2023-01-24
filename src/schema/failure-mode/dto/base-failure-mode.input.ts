import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class BaseFailureModeInput {
	@Field()
	@IsUUID()
	public elementId: string;

	@Field()
	@IsUUID()
	public unitId: string;

	@IsOptional()
	@Field({ nullable: true })
	public manifestationId: string;

	@IsOptional()
	@Field({ nullable: true })
	public customName: string;

	@IsOptional()
	@Field({ nullable: true })
	public metaData: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRemarks: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRemarks: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRemarks: string;

	@IsOptional()
	@Field({ nullable: true })
	public created_at: string;

	@IsOptional()
	@Field({ nullable: true })
	public updated_at: string;

	@Field()
	@IsUUID()
	public defaultFailureModeId: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsR: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsA: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsS: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsC: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsEc: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsEnv: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsP: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsR: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsA: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsS: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsC: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsEc: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsEnv: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsP: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsR: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsA: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsS: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsC: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsEc: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsEnv: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsP: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsTotalPriority: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsTotalPriority: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsTotalPriority: string;

	@IsOptional()
	@Field({ nullable: true })
	public analysisRamsWeightedPriority: string;

	@IsOptional()
	@Field({ nullable: true })
	public verificationRamsWeightedPriority: string;

	@IsOptional()
	@Field({ nullable: true })
	public maintenanceRamsWeightedPriority: string;

	@Field()
	@IsUUID()
	public copyOfFailureModeId: string;

	@Field()
	@IsUUID()
	public surveyScopeId: number;

	@IsOptional()
	@Field({ nullable: true })
	public failureModeType: string;

	@Field()
	@IsUUID()
	public function: string;

	@Field()
	@IsUUID()
	public guideword: string;

	@Field()
	@IsUUID()
	public failureMode: string;

	@Field()
	@IsUUID()
	public causeOfFailure: string;

	@Field()
	@IsUUID()
	public sourceOfFailure: string;

	@IsOptional()
	@Field({ nullable: true })
	public consequenceOfFailure: string;

	@IsOptional()
	@Field({ nullable: true })
	public noticableFailure: string;
}
