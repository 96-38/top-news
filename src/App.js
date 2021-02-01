//modules
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//components
import { Header } from './components/Header.js';
import { Card } from './components/Card.js';
import { Nhk } from './components/Nnk.js';
import { Yahoo } from './components/Yahoo.js';
import { Livedoor } from './components/Livedoor.js';
import { Excite } from './components/Excite.js';
import { Mainichi } from './components/Mainichi.js';
import { Nikkei } from './components/Nikkei.js';
import { Sankei } from './components/Sankei.js';
import { Asahi } from './components/Asahi.js';
import { Yomiuri } from './components/Yomiuri.js';
import { Hokkoku } from './components/Hokkoku.js';
//static assets
import './reset.css';
import './App.css';
import yahooNews from './components/img/yahooNews.png';
import nhkNews from './components/img/nhkNews.png';
import livedoorNews from './components/img/livedoorNews.png';
import exciteNews from './components/img/exciteNews.png';
import mainichi from './components/img/mainichi.png';
import nikkei from './components/img/nikkei.jpg';
import sankei from './components/img/sankei.png';
import asahi from './components/img/asahi.png';
import yomiuri from './components/img/yomiuri.png';
import hokkoku from './components/img/hokkoku.jpg';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/mainichi" component={Mainichi} />
        <Route path="/yomiuri" component={Yomiuri} />
        <Route path="/asahi" component={Asahi} />
        <Route path="/nikkei" component={Nikkei} />
        <Route path="/sankei" component={Sankei} />
        <Route path="/hokkoku" component={Hokkoku} />
        <Route path="/yahoo" component={Yahoo} />
        <Route path="/nhk" component={Nhk} />
        <Route path="/livedoor" component={Livedoor} />
        <Route path="/excite" component={Excite} />
      </Switch>
    </Router>
  );
}

const Home = () => {
  const dataArr = [
    {
      title: '毎日新聞',
      href: './mainichi',
      src: mainichi,
      target: '_self',
    },
    {
      title: '読売新聞',
      href: './yomiuri',
      src: yomiuri,
      target: '_self',
    },
    {
      title: '朝日新聞',
      href: './asahi',
      src: asahi,
      target: '_self',
    },
    {
      title: '日経新聞',
      href: './nikkei',
      src: nikkei,
      target: '_self',
    },
    {
      title: '産経新聞',
      href: './sankei',
      src: sankei,
      target: '_self',
    },
    {
      title: '北國新聞',
      href: './hokkoku',
      src: hokkoku,
      target: '_self',
    },
    {
      title: 'Yahoo! ニュース',
      href: './yahoo',
      src: yahooNews,
      target: '_self',
    },
    { title: 'NHK ニュース', href: './nhk', src: nhkNews, target: '_self' },
    {
      title: 'Livedoor ニュース',
      href: './livedoor',
      src: livedoorNews,
      target: '_self',
    },
    {
      title: 'excite ニュース',
      href: './excite',
      src: exciteNews,
      target: '_self',
    },
  ];
  return (
    <div className="inner">
      <div className="container">
        {dataArr.map((data) => (
          <Card
            key={data.title}
            title={data.title}
            link={data.href}
            img={data.src}
            target={data.target}
            fontSize="2.5rem"
            fontWeight="bold"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
