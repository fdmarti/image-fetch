import path from 'path';
import fs from 'fs';
import axios from 'axios';

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

    try {
        await Promise.all(
            JSON.parse(images).map(async (url: string) => {
                try {
                    const response = await axios({
                        url,
                        method: 'GET',
                        responseType: 'stream',
                    });

                    const newFileName = FileName.renameFile(url);
                    const writter = fs.createWriteStream(
                        `${directory}/${newFileName}`,
                    );
                    response.data.pipe(writter);
                } catch (error) {
                    console.error(
                        'Ocurrió un error al descargar la imagen:',
                        error,
                    );
                    throw error;
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
