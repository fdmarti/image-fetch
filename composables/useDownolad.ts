import type { PageZip } from '~/interface/PageZip';

export const useUseDownolad = () => {
    const urlToDownloadList = ref<PageZip[]>([]);

    const dowloadImages = async (imagesStack: string[], mainUrl: string) => {
        console.log(imagesStack);
        try {
            const { folderName } = await $fetch('/api/generate-folder', {
                method: 'POST',
                body: {
                    images: JSON.stringify(imagesStack),
                },
            });

            const { path, result } = await $fetch('/api/generate-zip', {
                method: 'POST',
                body: {
                    folderName: JSON.stringify(folderName),
                },
            });

            if (result) {
                const value = {
                    id: folderName,
                    path,
                    mainUrl,
                };
                urlToDownloadList.value.push(value);
                return value;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const setUrlsToDownload = (urlList: PageZip[]) => {
        urlToDownloadList.value = urlList;
    };

    return {
        dowloadImages,
        setUrlsToDownload,

        urlToDownloadList,
    };
};
