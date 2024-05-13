import { getImagesFromWeb } from '~/utils/get-images-web';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { url } = body;

	const urlStack = await getImagesFromWeb(url);
	const urlStackClean = new Set(urlStack);

	return {
		urlStackClean : [...urlStackClean],
	};
});
