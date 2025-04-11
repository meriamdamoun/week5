const fileManager = require('./fileManager.js');

const helloFilePath = './Hello World.txt';
const byeFilePath = './Bye World.txt';

async function processFiles() {
    try{
      const helloContent = await fileManager.readFile(helloFilePath);
      console.log('Content of Hello World.txt:', helloContent);
      
      await fileManager.writeFile(byeFilePath, 'Writing to the file');
      console.log('Successfully wrote to Bye World.txt');

      const byeContent = await fileManager.readFile(byeFilePath);
      console.log('Updated content of Bye World.txt:', byeContent);
    } catch (error) {
      console.error('Error:', error);
    }
}
processFiles();