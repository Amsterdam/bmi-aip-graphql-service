import { CreateSupportSystemInput } from '../dto/create-support-system.input';
import { UpdateSupportSystemInput } from '../dto/update-support-system.input';
import { SupportSystemType } from '../types';
import { CreateSupportSystemNormalizedInput } from '../dto/create-support-system-normalized.input';
import { UpdateSupportSystemNormalizedInput } from '../dto/update-support-system-normalized.input';

export const normalizeSupportSystemInputUtil = <
	T extends CreateSupportSystemNormalizedInput | UpdateSupportSystemNormalizedInput,
>(
	object: CreateSupportSystemInput | UpdateSupportSystemInput,
	input: T,
): T => {
	return Object.keys(object)
		.filter(
			(key) =>
				!['typeDetailedMast', 'typeDetailedFacade', 'typeDetailedTensionWire', 'typeDetailedNode'].includes(
					key,
				),
		)
		.reduce((acc, key) => {
			acc[key] = object[key];

			switch (object.type) {
				case SupportSystemType.Node:
					acc.typeDetailed = object.typeDetailedNode;
					break;
				case SupportSystemType.Mast:
					acc.typeDetailed = object.typeDetailedMast;
					break;
				case SupportSystemType.TensionWire:
					acc.typeDetailed = object.typeDetailedTensionWire;
					break;
				case SupportSystemType.Facade:
					acc.typeDetailed = object.typeDetailedFacade;
					break;
			}

			return acc;
		}, input);
};
