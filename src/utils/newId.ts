import { v4 as uuidv4 } from 'uuid';

export function newId() {
	return uuidv4();
}
