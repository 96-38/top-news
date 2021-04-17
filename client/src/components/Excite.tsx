import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import exciteNews from './img/exciteNews.png'; //modify here
import backArrow from './img/backArrow.png';

export const Excite = () => {
  //modify here
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  const getData = () => {
    return fetch('./api/excite').then((response) => response.json());
  };

  useEffect(() => {
    getData().then((response) => setData(response));
  }, []);

  const headerProps = {
    pageTitle: 'excite',
    icon: backArrow,
  };

  if (!data?.length) {
    return (
      <>
        <Header {...headerProps} />;
        <Loader />
      </>
    );
  }

  return (
    <>
      <Header {...headerProps} />;
      <div className="inner">
        <div className="container">
          {data?.map((data) => (
            <Card
              key={data.textContent}
              title={data.textContent}
              link={data.href}
              img={exciteNews}
              target="_blank"
              fontSize="1.9rem"
              fontWeight="normal"
            />
          ))}
        </div>
      </div>
    </>
  );
};
