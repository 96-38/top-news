import React from 'react';
import { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import hokkoku from './img/hokkoku.jpg'; //modify here

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

  //modify section text
  if (!data?.length) {
    return <Loader />;
  }
  return (
    <>
      <div className="inner">
        <h2 className="section">北國新聞</h2>
        <div className="container">
          {data?.map((data) => (
            <Card
              key={data.textContent}
              title={data.textContent}
              link={data.href}
              img={hokkoku}
              target="_blank"
              fontSize="1.5rem"
              fontWeight="normal"
            />
          ))}
        </div>
      </div>
    </>
  );
};
