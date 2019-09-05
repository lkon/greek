'use strict';

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const sources = require('./srs');

const regex = /.+\/(.+)\/1300\/(.+)\.mp3/gm;
const subst = `$2_$1.mp3`;
let index = 0;
const srcLength = sources.length;

async function downloadAudio(i) {
    const url = sources[i];
    const fileName = url.replace(regex, subst);

    const path = Path.resolve(__dirname, 'audio', fileName);
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
    }).then(() => {
        index++;
        index < srcLength && downloadAudio(index);
    });
}

downloadAudio(index);
