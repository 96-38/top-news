import { GetElms } from './types';

// DOM から取得した情報を配列で返す (img:src)
export const getElms: GetElms = async (
  page,
  url,
  titleSelector,
  linkSelector,
  imgSelector
) => {
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
        const result: {
          [key: string]: string;
        }[] = [];
        targetArray.forEach((elm) => {
          let item: { [key: string]: string } = {
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
      const data: { [key: string]: string }[] = [];
      for (let index = 0; index < titles.length; index++) {
        let item = { ...titles[index], ...links[index], ...src[index] };
        data.push(item);
      }

      //重複を除外
      // @ts-ignore
      const uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
      return uniqueData;
    },
    titleSelector,
    linkSelector,
    imgSelector
  );
};
