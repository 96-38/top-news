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
新聞を数週間毎日要約する課題があり、様々な新聞社の Web ページを行き来しなければならず不便だったため、1つのページからアクセスできれば便利だと考えて制作しました。また、普段自分のインプット領域が偏る傾向にあるので、その日の主要なニュースを網羅的に確認できれば便利だと考えて制作しました。

## デモ
準備中

## 使用した技術
- [React](https://github.com/facebook/react)

- [TypeScript](https://github.com/microsoft/TypeScript)

- [Puppeteer](https://github.com/puppeteer/puppeteer)

- [Express](https://github.com/expressjs/express)

- [Node.js](https://github.com/nodejs/node)


## ローカル環境での起動方法

Express を使用するサーバー と React の開発サーバー(webpack-dev-server) の 2 つを起動する必要があります。<br>リポジトリをローカルにクローンした後、ターミナルを 2 窓用意して top-news ディレクトリでそれぞれ以下のコマンドを実行して下さい。

```
cd server
yarn
yarn start
```

```
cd client
yarn
yarn start
```
