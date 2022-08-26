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
				case SupportSystemType.node:
					acc.typeDetailed = object.typeDetailedNode;
					break;
				case SupportSystemType.mast:
					acc.typeDetailed = object.typeDetailedMast;
					break;
				case SupportSystemType.tensionWire:
					acc.typeDetailed = object.typeDetailedTensionWire;
					break;
				case SupportSystemType.facade:
					acc.typeDetailed = object.typeDetailedFacade;
					break;
			}

			return acc;
		}, input);
};
