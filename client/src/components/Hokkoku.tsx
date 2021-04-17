import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import hokkoku from './img/hokkoku.jpg'; //modify here
import backArrow from './img/backArrow.png';

//modify component Name
export const Hokkoku = () => {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  //modify path
  const getData = () => {
    return fetch('./api/hokkoku').then((response) => response.json());
  };

  useEffect(() => {
    getData().then((response) => setData(response));
  }, []);

  const headerProps = {
    pageTitle: '北國新聞',
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
              img={hokkoku}
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
