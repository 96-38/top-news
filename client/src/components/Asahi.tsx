import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import asahi from './img/asahi.png'; //modify here
// import logo from './img/logo/asahi_logo.svg';
import backArrow from './img/backArrow.png';

//modify component Name
export const Asahi = () => {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  //modify path
  const getData = () => {
    return fetch('./api/asahi').then((response) => response.json());
  };

  useEffect(() => {
    getData().then((response) => setData(response));
  }, []);

  const headerProps = {
    pageTitle: '朝日新聞',
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
              img={data.src || asahi}
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
