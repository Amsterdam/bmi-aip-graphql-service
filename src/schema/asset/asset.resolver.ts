import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';
import { NotImplementedException } from '@nestjs/common';

import { Batch } from '../batch/models/batch.model';

import { AssetService } from './asset.service';
import { Asset } from './models/asset.model';
import { CreateAssetInput } from './dto/create-asset.input';
import { CreateAssetCommand } from './commands/create-asset.command';
import { UpdateAssetCommand } from './commands/update-asset.command';
import { UpdateAssetInput } from './dto/update-asset.input';
import { DBAsset } from './asset.repository';
import { AssetFactory } from './asset.factory';
import { UpdateAssetPassportByObjectCodeCommand } from './commands/update-asset-passport-by-objectCode.command';
import { AssetAttributesInput } from './dto/asset-attributes.input';

@Resolver((of) => Asset)
@Resource(Asset.name)
export class AssetResolver {
	constructor(private assetService: AssetService, private commandBus: CommandBus) {}

	@Mutation(() => Asset)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createAsset(@Args('createObject') input: CreateAssetInput): Promise<Asset> {
		return this.commandBus.execute<CreateAssetCommand>(new CreateAssetCommand(input));
	}

	@Mutation(() => Asset)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateAsset(@Args('updateAsset') input: UpdateAssetInput): Promise<Asset> {
		const domainAsset: DBAsset = await this.commandBus.execute<UpdateAssetCommand>(new UpdateAssetCommand(input));
		return AssetFactory.FromDBAsset(domainAsset);
	}

	@Mutation(() => Asset)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateAssetPassportByObjectCode(
		@Args('updateAssetPassportByObjectCode') input: AssetAttributesInput,
	): Promise<Asset> {
		const domainAsset: DBAsset = await this.commandBus.execute<UpdateAssetPassportByObjectCodeCommand>(
			new UpdateAssetPassportByObjectCodeCommand(input),
		);
		return AssetFactory.FromDBAsset(domainAsset);
	}

	@ResolveField()
	batches(@Parent() { id }: Asset): Promise<Batch[]> {
		throw new NotImplementedException('The field resolver for asset.batches has not yet been implemented');
	}
}
