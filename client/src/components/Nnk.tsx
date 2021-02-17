import React from 'react';
import { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';

export const Nhk = () => {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  const getData = () => {
    return fetch('./api/nhk').then((response) => response.json());
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
        <h2 className="section">NHK ニュース</h2>
        <div className="container">
          {data?.map((data) => (
            <Card
              key={data.textContent}
              title={data.textContent}
              link={data.href}
              img={data.src}
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
