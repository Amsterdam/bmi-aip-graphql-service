import { Luminaire } from '../models/luminaire.model';
import { CreateLuminaireInput } from '../dto/create-luminaire.input';
import { Luminaire as DomainLuminaire } from '../types/luminaire.repository.interface';
import { LuminaireFactory } from '../luminaire.factory';
import { UpdateLuminaireInput } from '../dto/update-luminaire.input';
import { SupplierType } from '../../../types';

const luminaire1 = new Luminaire();
luminaire1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
luminaire1.supportSystemId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
luminaire1.name = 'Support System 1';
luminaire1.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};

const luminaire2 = new Luminaire();
luminaire2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
luminaire2.supportSystemId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
luminaire2.name = 'Support System 2';
luminaire2.geography = {
	type: 'Point',
	coordinates: [52.370302853062604, 4.893996915500548],
};

export { luminaire1, luminaire2 };

const luminaireRaw: Omit<DomainLuminaire, 'id'> = {
	name: '__NAME__',
	location: '__LOCATION__',
	supportSystemId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	remarks: '__REMARKS__',
	deleted_at: null,
	created_at: undefined,
	updated_at: undefined,
	geography: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	constructionYear: 1979,
	driverCommissioningDate: null,
	lightCommissioningDate: null,
	driverSupplierType: SupplierType.one,
	lightSupplierType: SupplierType.two,
	manufacturer: '__MANUFACTURER__',
	supplierType: 'two',
};

export const luminaireInput = Object.keys(luminaireRaw).reduce((input, key) => {
	input[key] = luminaireRaw[key];
	return input;
}, new CreateLuminaireInput());

const updateLuminaire = new UpdateLuminaireInput();
updateLuminaire.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateLuminaireInput = Object.keys(luminaireRaw).reduce((input, key) => {
	input[key] = luminaireRaw[key];
	return input;
}, updateLuminaire);

export const domainLuminaire: DomainLuminaire = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...luminaireRaw,
	deleted_at: null,
};

export const luminaire = LuminaireFactory.CreateLuminaire(domainLuminaire);

export const deletedLuminaire: DomainLuminaire = {
	...domainLuminaire,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
