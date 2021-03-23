//modules
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//components
import { Header } from './components/Header';
import { Card } from './components/Card';
import { Nhk } from './components/Nnk';
import { Yahoo } from './components/Yahoo';
import { Livedoor } from './components/Livedoor';
import { Excite } from './components/Excite';
import { Mainichi } from './components/Mainichi';
import { Nikkei } from './components/Nikkei';
import { Sankei } from './components/Sankei';
import { Asahi } from './components/Asahi';
import { Yomiuri } from './components/Yomiuri';
import { Hokkoku } from './components/Hokkoku';
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

const headerProps = {
  pageTitle: 'Top News',
};

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
      title: 'livedoor ニュース',
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
    <>
      <Header {...headerProps} />
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
    </>
  );
};

export default App;
