import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { url } = body;

    const images = [];

    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const svgImages = await page.evaluate(() => {
            return new Promise<string[]>((resolve) => {
                const elements = Array.from(document.querySelectorAll('svg'));
                const svgs = elements.map((svg) => svg.outerHTML);
                resolve([...svgs]);
            });
        });

        images.push(...svgImages);

        const imagesImg = await page.evaluate(async () => {
            return new Promise<string[]>((resolve) => {
                const elements = Array.from(document.querySelectorAll('img'));
                const imgs = elements.map((img) => img.currentSrc);
                resolve([...imgs]);
            });
        });

        images.push(...imagesImg);
        const urlStackClean = [...new Set(images)];

        return urlStackClean;
    } catch (error) {
        console.log(`Algo se rompio`);
        return [];
    }
});
