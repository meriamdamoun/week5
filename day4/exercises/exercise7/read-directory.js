const fs = require('fs');

const directoryPath = 'C:/Users/Ayman/Desktop/New folder';

(async () => {
    try {
        const files = await fs.promises.readdir(directoryPath);
        console.log('Files in directory:');
        files.forEach(file => {
            console.log(` - ${file}`);
        });
    } catch (err) {
        console.error('Error reading directory:', err);
    }
})();