const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.port || 3000;

const website = 'https://www.globo.com/';

try {
  axios(website).then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);

    let content = [];

    $('.post__link', data).each(function (e) {
      const title = $(this).attr('title');
      const url = $(this).attr('data-tracking-label');

      content.push({
        index: e,
        title,
        url,
      });
    });
    app.get('/', (req, res) => {
      res.json(content);
    });
  });
} catch (e) {
  console.log(e, e.message);
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
