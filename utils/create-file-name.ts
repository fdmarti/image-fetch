export class FileName {
	constructor() {}

	static renameFile(fileName: string): string {
		const splitName = fileName.split('/');
		const realName = splitName[splitName.length - 1];
		return realName;
	}
}
