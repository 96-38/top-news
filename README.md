# Top News
主要な新聞社、ニュースサイトに掲載されているトップニュースを一覧表示するアプリケーションです。

|PC|Mobile|
|:----:|:----:|
|<img src="https://user-images.githubusercontent.com/48713768/107577865-541aac00-6c36-11eb-9e4b-42902b38aa58.gif" width="400px">|<img src="https://user-images.githubusercontent.com/48713768/107577854-4ebd6180-6c36-11eb-97fa-489a5ca6377f.gif" width="200px">|<
## 概要
「Top News」は以下の機能を提供します。
- 各新聞社(全国紙5紙)、主要ニュースサイトのトップニュースを一覧表示
- 記事一覧画面から各記事の Web ページへアクセス

## 制作背景
新聞記事を数週間毎日要約する課題があり、様々な新聞社の Web ページを行き来しなければならず不便だったため、1つのページからアクセスできれば便利だと考えて制作しました。また、普段自分のインプット領域が偏る傾向にあるので、その日の主要なニュースを網羅的に確認できれば便利だと考えて制作しました。

## デモ
[こちら](https://top-news.9638.dev/)から実際の動作を確認できます。

## 使用した技術
- [React](https://github.com/facebook/react)

- [TypeScript](https://github.com/microsoft/TypeScript)

- [Puppeteer](https://github.com/puppeteer/puppeteer)

- [ioredis](https://github.com/luin/ioredis)

- [Express](https://github.com/expressjs/express)

- [Node.js](https://github.com/nodejs/node)


## ローカル環境での起動方法

**ローカル環境に [Redis](https://redis.io/download) サーバが起動している必要があります。**

次のコマンドを実行すると http://localhost:8080/ に起動します。
```
git clone https://github.com/96-38/top-news.git
cd top-news
yarn build
node server/dist/getData.js
node server/dist/server.js
```
