import { ObjectTypeUnitCode as DomainObjectTypeUnitCode } from '../types/object-type-unit-code.repository.interface';
import { ObjectTypeUnitCode } from '../../decomposition/models/object-type-unit-code.model';

export const objectTypeUnitCode = new ObjectTypeUnitCode();
objectTypeUnitCode.id = '9812a0c4-9cb4-4df2-b490-7a5653222f79';
objectTypeUnitCode.code = '__CODE__';
objectTypeUnitCode.name = '__NAME__';
objectTypeUnitCode.isElectrical = false;
objectTypeUnitCode.isStructural = false;
objectTypeUnitCode.replacementIndex = 0;

export const domainObjectTypeUnitCode: DomainObjectTypeUnitCode = {
	id: '',
	code: '__CODE__',
	name: '__NAME__',
	isElectrical: false,
	isStructural: false,
	replacementIndex: 0,
	created_at: undefined,
	updated_at: undefined,
};
