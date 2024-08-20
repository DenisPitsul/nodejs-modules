const fs = require('fs');
const path = require('path');

fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error reading current dir using readdir:', err);
    return;
  }
  console.log('Reading current dir using readdir:', files);
});

try {
  const files = fs.readdirSync('.');
  console.log('Reading current dir using readdirSync: ', files);
} catch (err) {
  console.error('Error Reading current dir using readdirSync:', err);
}

async function readJsFiles () {
  try {
    const files = await fs.promises.readdir('.', { withFileTypes: true });

    const jsFiles = files.filter(
      file => file.isFile() && file.name.endsWith('.js')
    );

    console.log(
      'JavaScript Files:',
      jsFiles.map(file => file.name)
    );

    for (const file of jsFiles) {
      const filePath = path.join('.', file.name);
      const content = fs.readFileSync(filePath, 'utf8');
      console.log(`\nContent of ${file.name}:`);
      console.log(content);
      console.log('-----------------------------------');
    }
  } catch (err) {
    console.error(
      'Error Reading current dir using readdir with promises:',
      err
    );
  }
}

readJsFiles();
