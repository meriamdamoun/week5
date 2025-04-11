const fs = require('fs');

(async () => {
    try {
        const data = await fs.promises.readFile('source.txt', 'utf8');
        await fs.promises.writeFile('destination.txt', data, 'utf8');
        console.log('File was successfully copied from source.txt to destination.txt');
    } catch (err) {
        console.error('Error during file operation:', err);
    }
})();