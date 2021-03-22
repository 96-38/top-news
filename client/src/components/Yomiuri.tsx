import React from 'react';
import { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import yomiuri from './img/yomiuri.png'; //modify here

//modify component Name
export const Yomiuri = () => {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  //modify path
  const getData = () => {
    return fetch('./api/yomiuri').then((response) => response.json());
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
        <h2 className="section">{/* 読売新聞 */}</h2>
        <div className="container">
          {data?.map((data) => (
            <Card
              key={data.textContent}
              title={data.textContent}
              link={data.href}
              img={yomiuri}
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
