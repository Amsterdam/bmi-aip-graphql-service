import { Document } from './document.model';

describe('Document', () => {
	it('should create a new document instance', () => {
		const document = new Document();
		expect(document).toBeDefined();
	});

	it('should have an assetCode property of type string', () => {
		const document = new Document();
		document.assetCode = '123456';
		expect(document.assetCode).toBeDefined();
		expect(typeof document.assetCode).toBe('string');
	});

	it('should have a fileName property of type string', () => {
		const document = new Document();
		document.fileName = 'test.pdf';
		expect(document.fileName).toBeDefined();
		expect(typeof document.fileName).toBe('string');
	});
});
