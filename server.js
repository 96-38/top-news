const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

//ニュースの情報を取得する関数
async function getNews(page, url, titleSelector, linkSelector, imgSelector) {
  // コンソールイベントを登録(for debug)
  page.on('console', (msg) => {
    for (let i = 0; i < msg._args.length; ++i)
      console.log(`${i}: ${msg._args[i]}`);
  });

  await page.goto(url); // ページへ移動

  // 任意のJavaScriptを実行
  return await page.evaluate(
    (titleSelector, linkSelector, imgSelector) => {
      //DOMから要素を取得する関数
      const getElm = (targetArray, targetElement) => {
        const result = [];
        targetArray.forEach((elm) => {
          let item = {
            [targetElement]: elm[targetElement],
          };
          result.push(item);
        });
        return result;
      };
      //タイトル取得
      const list = document.querySelectorAll(titleSelector);
      const titles = getElm(list, 'textContent');

      //リンク取得
      const anchor = document.querySelectorAll(linkSelector);
      const links = getElm(anchor, 'href');
      //画像取得
      const img = document.querySelectorAll(imgSelector);
      const src = getElm(img, 'src');

      //タイトル配列とリンク配列,画像配列をマージ
      const data = [];
      for (let index = 0; index < titles.length; index++) {
        let item = { ...titles[index], ...links[index], ...src[index] };
        data.push(item);
      }

      return data;
    },
    titleSelector,
    linkSelector,
    imgSelector
  );
}

//ニュースの情報を取得する関数(for srcset)
async function getNewsSrcset(
  page,
  url,
  titleSelector,
  linkSelector,
  imgSelector
) {
  await page.goto(url); // ページへ移動
  // 任意のJavaScriptを実行
  return await page.evaluate(
    (titleSelector, linkSelector, imgSelector) => {
      //DOMから要素を取得する関数
      const getElm = (targetArray, targetElement) => {
        const result = [];
        targetArray.forEach((elm) => {
          let item = {
            [targetElement]: elm[targetElement],
          };
          result.push(item);
        });
        return result;
      };
      //タイトル取得
      const list = document.querySelectorAll(titleSelector);
      const titles = getElm(list, 'textContent');

      //リンク取得
      const anchor = document.querySelectorAll(linkSelector);
      const links = getElm(anchor, 'href');
      //画像取得
      const img = document.querySelectorAll(imgSelector);
      const src = getElm(img, 'srcset');

      //タイトル配列とリンク配列,画像配列をマージ
      const data = [];
      for (let index = 0; index < titles.length; index++) {
        let item = { ...titles[index], ...links[index], ...src[index] };
        data.push(item);
      }

      return data;
    },
    titleSelector,
    linkSelector,
    imgSelector
  );
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Yahoo News
app.get('/api/yahoo', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'texttrack',
          'xhr',
          'eventsource',
          'websocket',
          'manifest',
          'fetch',
          'media',
          'script',
          'image',
          'stylesheet',
          'font',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.topics li';
    const anchorSelector = '.topics li a ';
    const url = 'https://news.yahoo.co.jp/';
    const newsArray = await getNews(page, url, titleSelector, anchorSelector);

    await browser.close();

    await res.json(newsArray);
    console.log('Took', Date.now() - start, 'ms');
  })();
});

//NHK News
app.get('/api/nhk', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block css,resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'texttrack',
          'eventsource',
          'websocket',
          'manifest',
          'fetch',
          'media',
          'stylesheet',
          'font',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.content--list li em';
    const anchorSelector = '.content--list li dd > a ';
    const imgSelector = '.content--list > li > dl > dt > a > img ';
    const url = 'https://www3.nhk.or.jp/news/';
    const newsArray = await getNews(
      page,
      url,
      titleSelector,
      anchorSelector,
      imgSelector
    );

    await browser.close();

    await res.json(newsArray);
    console.log('Took', Date.now() - start, 'ms');
  })();
});

//Livedoor News
app.get('/api/livedoor', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        ['media', 'script', 'image', 'stylesheet', 'font'].includes(
          request.resourceType()
        )
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.topTopicsList > .topicsList > li > a ';
    const anchorSelector = '.topTopicsList > .topicsList > li > a';
    const url = 'https://news.livedoor.com/';
    const newsArray = await getNews(page, url, titleSelector, anchorSelector);

    await browser.close();

    await res.json(newsArray);
    console.log('Took', Date.now() - start, 'ms');
  })();
});

//excite News
app.get('/api/excite', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block css,font
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'texttrack',
          'xhr',
          'eventsource',
          'websocket',
          'manifest',
          'fetch',
          'media',
          'script',
          'image',
          'stylesheet',
          'font',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = 'headline > ul > li > a > span';
    const anchorSelector = 'headline > ul > li > a ';
    const url = 'https://www.excite.co.jp/';
    const newsArray = await getNews(page, url, titleSelector, anchorSelector);

    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
});

// mainichi
app.get('/api/mainichi', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block css,font
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'stylesheet',
          'font',
          'media',
          'script',
          'xhr',
          'fetch',
          'websocket',
          'eventsource',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector =
      '[data-cx-area="top-selection"] .toppickup-detail > .toppickup-title.mb-10';
    const titleSelector2 =
      '[data-cx-area="top-selection"] ul.toppickuplist > li h3';
    const anchorSelector = '[data-cx-area="top-selection"] .toppickup a';
    const anchorSelector2 =
      '[data-cx-area="top-selection"] ul.toppickuplist > li a';
    const url = 'https://mainichi.jp/';
    const newsArray = await getNews(page, url, titleSelector, anchorSelector);
    const newsArray2 = await getNews(
      page,
      url,
      titleSelector2,
      anchorSelector2
    );
    const newsArray3 = [...newsArray, ...newsArray2];
    // newsArray3.length = 7;

    await res.json(newsArray3);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
});

// nikkei
app.get('/api/nikkei', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        ['font', 'media', 'xhr', 'fetch', 'websocket', 'eventsource'].includes(
          request.resourceType()
        )
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.k-card__title';
    const anchorSelector = '.k-card__title-link';
    const imgSelector =
      '.k-picture__content > source[media="(min-width: 0px)"]';
    const url = 'https://www.nikkei.com/';
    const newsArray = await getNewsSrcset(
      page,
      url,
      titleSelector,
      anchorSelector,
      imgSelector
    );
    newsArray.length = 7;

    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
});

// sankei
app.get('/api/sankei', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'font',
          'media',
          'xhr',
          'fetch',
          'websocket',
          'eventsource',
          'script',
          'stylesheet',
          'texttrack',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '[data-tb-region="top"] .entry_title';
    const anchorSelector = '[data-tb-region="top"] .entry_title > a';
    const imgSelector = '[data-tb-region="top"]  .entry_img > figure > img';
    const url = 'https://www.sankei.com/';
    const newsArray = await getNews(
      page,
      url,
      titleSelector,
      anchorSelector,
      imgSelector
    );

    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
});

// asahi
app.get('/api/asahi', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'font',
          'media',
          'xhr',
          'fetch',
          'websocket',
          'eventsource',
          'script',
          'stylesheet',
          'texttrack',
          'image',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.c-articleModule__title';
    const anchorSelector = '.c-articleModule__title > a';
    const imgSelector = '.c-articleModule__image > a > img';
    const url = 'https://www.asahi.com/';
    const newsArray = await getNews(
      page,
      url,
      titleSelector,
      anchorSelector,
      imgSelector
    );
    newsArray.length = 7;

    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
});

// yomiuri
app.get('/api/yomiuri', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'font',
          'media',
          'xhr',
          'fetch',
          'websocket',
          'eventsource',
          'script',
          'stylesheet',
          'texttrack',
          'image',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.home-2020-prime-topnews > h3 > a';
    const anchorSelector = '.home-2020-prime-topnews > h3 > a';
    const url = 'https://www.yomiuri.co.jp/';
    const newsArray = await getNews(page, url, titleSelector, anchorSelector);
    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
});

// hokkoku
app.get('/api/hokkoku', (req, res) => {
  (async () => {
    //measure time
    const start = Date.now();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // block resource
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        [
          'font',
          'media',
          'xhr',
          'fetch',
          'websocket',
          'eventsource',
          'script',
          'stylesheet',
          'texttrack',
          'image',
        ].includes(request.resourceType())
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const titleSelector = '.top-news-list__item .top-news-list__title';
    const anchorSelector = '.top-news-list__item > a';
    const imgSelector = '.top-news-img-slider__item > img'; //ブラウザのconsoleでは取得できるが、なぜかうまく取得できない
    const url = 'https://www.hokkoku.co.jp/';
    const newsArray = await getNews(page, url, titleSelector, anchorSelector);

    newsArray.length = 8;
    await res.json(newsArray);
    await browser.close();
    console.log('Took', Date.now() - start, 'ms');
  })();
});

//listen port
app.listen(process.env.PORT || 8080);
