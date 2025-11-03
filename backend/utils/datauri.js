import DATAURIParser from 'datauri/parser.js';

import path from 'path';
import {excitcode} from 'process';

const getDataUri = (filePath) => {
    const parser = new DATAURIParser();
    const extName = path.extname(filePath);
    return parser.format(extName, filePath).content;
}
export default getDataUri;
