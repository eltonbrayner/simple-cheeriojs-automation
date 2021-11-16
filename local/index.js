const fs = require('fs');
const cheerio = require('cheerio');
const page = require('./page');

const $ = cheerio.load(page.html);

const data = [];

$('img').each((i, el) => {
  const src = $(el).attr('src');
  const title = $(el).attr('alt');
  if (!src.endsWith('jpg')) return;

  const partial = src.split('@').shift();
  const url = `${partial}@.@.jpg`;

  data.push({
    id: i,
    title,
    url,
  });
  console.log(data);
  fs.writeFile('movie.json', JSON.stringify(data, null, 2), 'utf-8', () => {});
});
