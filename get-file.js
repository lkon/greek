'use strict';

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

const sources = page => `https://www.idesk24.com/LMS_LIGHT/BOOKS/bk39616431/jpg/pg_${page}.jpg?740`;
let index = 1;

const srcLength = 148;

async function downloadFile(i) {
    const url = sources(i);
    const fileName = `page_${index}.jpg`;

    console.log(url, fileName)

    const path = Path.resolve(__dirname, 'files', fileName);
    const writer = Fs.createWriteStream(path);

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);

        // resolve(); reject();
    }).then(() => {
        index++;
        index <= srcLength && downloadFile(index);
    });
}

downloadFile(index);



