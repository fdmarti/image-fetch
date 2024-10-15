import puppeteer from 'puppeteer';

export const getImagesFromWeb = async (url: string): Promise<string[]> => {
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(url);

        const images = await page.evaluate(() => {
            const imagesStack: string[] = [];
            const imagesNode = document.querySelectorAll('img');
            imagesNode.forEach((element) => {
                imagesStack.push(element.currentSrc);
            });

            return imagesStack;
        });

        return images;
    } catch (error) {
        console.log(`Algo se rompio`);
        return [];
    }
};
