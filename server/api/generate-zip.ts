import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { folderName } = body;
	const fileName = folderName.replaceAll('"', '');

	const zip = new AdmZip();

	const imagesDirectory = path.join(
		path.resolve(),
		`/public/images/${fileName}`,
	);

	const zipDirectory = path.join(
		path.resolve(),
		`/public/zip/${fileName}.zip`,
	);

	if (fs.existsSync(imagesDirectory)) {
		zip.addLocalFolder(imagesDirectory);
		zip.writeZip(zipDirectory);
	}

	return {
		path: `/zip/${fileName}.zip`,
		result: true,
	};
});
