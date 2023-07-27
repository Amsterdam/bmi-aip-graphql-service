import { Document } from './document.model';

let document;

describe('Document', () => {
	beforeAll(async () => {
		document = new Document();
		document.assetCode = '123456';
		document.fileName = 'test.pdf';
	});

	it('should create a new document instance', () => {
		expect(document).toBeDefined();
	});

	it('should have an assetCode property of type string', () => {
		expect(document.assetCode).toBeDefined();
		expect(typeof document.assetCode).toBe('string');
	});

	it('should have a fileName property of type string', () => {
		expect(document.fileName).toBeDefined();
		expect(typeof document.fileName).toBe('string');
	});
});
