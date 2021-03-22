import React from 'react';
import { useEffect } from 'react';
import './css/card.css';
import '../reset.css';
import news from './img/news.png';
import { TODO_FROM_JS_TO_TS } from '../types';
interface CardProps {
  [key: string]: TODO_FROM_JS_TO_TS;
}

export const Card = (props: CardProps) => {
  //改行による font-size の調整
  useEffect(() => {
    const list = document.querySelectorAll<HTMLElement>('.card__text__shop');
    list.forEach((node) => {
      const height = node.offsetHeight;
      if (height > 200) {
        node.classList.add('fontSize_s');
      }
    });
  }, []);

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
          </div>
        </div>
      </a>
    </div>
  );
};
