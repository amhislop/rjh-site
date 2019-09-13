const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const purify = require('purify-css');

(async () => {
  const files = fs.readdirSync('./dist', { encoding: 'utf8' });

  const htmlFiles = files.filter(file => path.extname(file) === '.html');
  const cssFile = files.find(file => path.extname(file) === '.css');

  const content = ['dist/*.js', 'dist/*.html'];

  const options = {
    output: `./dist/${cssFile}`,
    minify: true,
    info: true,
    // Logs out removed selectors.
    // rejected: true,
  };

  purify(content, [`./dist/${cssFile}`], options);

  htmlFiles.forEach(file => {
    const src = fs.readFileSync(`./dist/${file}`, 'utf8');

    if (!/\.html/g.test(src)) return;

    const data = src.replace(/\.html/g, '');

    fs.writeFile(`./dist/${file}`, data, err => {
      if (err) throw err;
      console.log(`🔧  ${file} html links sanitised`);
    });
  });
})();
