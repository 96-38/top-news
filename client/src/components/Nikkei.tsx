import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import nikkei from './img/nikkei.jpg'; //modify here

//modify component Name
export const Nikkei = () => {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  //modify path
  const getData = () => {
    return fetch('./api/nikkei').then((response) => response.json());
  };

  useEffect(() => {
    getData().then((response) => setData(response));
  }, []);

  const headerProps = {
    pageTitle: '日経新聞',
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
              img={data.srcset || nikkei}
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
