import * as React from 'react';
import { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Card } from './Card';
import '../App.css';
import sankei from './img/sankei.png'; //modify here

//modify component Name
export const Sankei = () => {
  const [data, setData] = useState([]);

  //modify path
  const getData = () => {
    return fetch('./api/sankei').then((response) => response.json());
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
        <h2 className="section">産経新聞</h2>
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
