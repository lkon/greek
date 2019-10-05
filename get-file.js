'use strict';

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

const sources = 'https://biblio-online.ru/viewer/getPage/7D324B09-E3A7-4637-9026-193EBCCA7A2C/';
let index = 107;

const srcLength = 108;
// const srcLength = 200;

async function downloadFile(i) {
    const url = `${sources}${i}`;
    const fileName = `page_${index}.svg`;

    console.log(url, fileName)

    const path = Path.resolve(__dirname, 'files', fileName);
    // const writer = Fs.writeFile(path);

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'document'
    });

    console.log(response)

    // response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        // writer.on('finish', resolve);
        // writer.on('error', reject);

        resolve(); reject();
    }).then(() => {
        // index++;
        // index <= srcLength && downloadFile(index);
    });
}

downloadFile(index);