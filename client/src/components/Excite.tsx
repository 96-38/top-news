import React from 'react';
import { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import exciteNews from './img/exciteNews.png'; //modify here

export const Excite = () => {
  //modify here
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  const getData = () => {
    return fetch('./api/excite').then((response) => response.json());
  };

  useEffect(() => {
    getData().then((response) => setData(response));
  }, []);

  if (!data?.length) {
    return <Loader />;
  }
  return (
    <>
      <div className="inner">
        <h2 className="section">{/* excite ニュース */}</h2>
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
