import React from 'react';
import './css/card.css';
import '../reset.css';
import news from './img/news.png';

export const Card = (props) => {
  const { title, link, img, target, fontSize, fontWeight } = props;
  const style = { fontSize, fontWeight };
  return (
    <div className="card-wrapper">
      <a href={link} target={target} rel="noopener noreferrer">
        <div className="card">
          <div className="card__img">
            <img src={img || news} alt="img" />
          </div>
          <div className="card__text">
            <p className="card__text__shop" style={style}>
              {title}
            </p>
            {/* <p className="card__text__distance">1.9km</p> */}
          </div>
        </div>
      </a>
    </div>
  );
};
