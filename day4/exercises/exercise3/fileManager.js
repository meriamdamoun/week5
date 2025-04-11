const fs = require('fs');

async function readFile(filePath, encoding = 'utf8') {
    try {
        const data = await fs.promises.readFile(filePath, encoding);
        return data;
    } catch (err) {
        throw err;
    }
}

async function writeFile(filePath, data, encoding = 'utf8') {
    try {
        const dataString = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
        await fs.promises.writeFile(filePath, dataString, encoding);
        return true;
    } catch (err) {
        throw err;
    }
}

export { readFile, writeFile };