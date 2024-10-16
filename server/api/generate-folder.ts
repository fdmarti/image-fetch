import path from 'path';
import fs from 'fs';
import axios, { ResponseType } from 'axios';

import { uuid } from '~/utils/generate-random-folder';
import { FileName } from '~/utils/create-file-name';

export default defineEventHandler(async (event) => {
    const folderName = uuid.generate();

    const directory = path.join(path.resolve(), `/public/images/${folderName}`);

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    const body = await readBody(event);
    const { images } = body;

    let imageBlobAmount = 1,
        newFileName = '';

    try {
        await Promise.all(
            JSON.parse(images).map(async (url: string) => {
                // SVG
                if (url.includes('</svg>')) {
                    newFileName = `svg_image_${imageBlobAmount}.svg`;
                    const filePath = path.join(directory, newFileName);
                    fs.writeFileSync(filePath, url);
                    imageBlobAmount++;
                    return true;
                }

                // PNG,JPG

                try {
                    const { data } = await axios({
                        url,
                        method: 'GET',
                        responseType: 'stream',
                    });

                    newFileName = FileName.renameFile(url);

                    const writter = fs.createWriteStream(
                        `${directory}/${newFileName}`,
                    );
                    data.pipe(writter);
                    return true;
                } catch (error) {
                    console.error(
                        'Ocurrió un error al descargar la imagen:',
                        error,
                    );
                    return false;
                }
            }),
        );

        return {
            status: true,
            folderName,
        };
    } catch (error) {
        console.error(
            'Ocurrió un error al descargar una o más imágenes:',
            error,
        );
        return {
            status: false,
            folderName: error,
        };
    }
});
