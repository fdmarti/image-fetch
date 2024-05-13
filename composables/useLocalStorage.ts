import type { PageZip } from '../interface/PageZip';

export const useUseLocalStorage = () => {
	const loadUrlFromPath = (): PageZip[] | [] => {
		const list = localStorage.getItem('list-image-fecth-nuxt');
		if (!list) {
			localStorage.setItem('list-image-fecth-nuxt', JSON.stringify([]));
			return [];
		} else {
			const pathList = localStorage.getItem('list-image-fecth-nuxt');
			return JSON.parse(pathList!);
		}
	};

	const updateLocalStorageUrlList = (urlList: PageZip[]) => {
		localStorage.setItem('list-image-fecth-nuxt', JSON.stringify(urlList));
	};

	return {
		loadUrlFromPath,
		updateLocalStorageUrlList,
	};
};
