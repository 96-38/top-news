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
  //改行による font-size の調整 (記事タイトルが 4 行になる時 3 行に収める)
  useEffect(() => {
    const vw = window.innerWidth;
    const list = document.querySelectorAll<HTMLElement>('.card__text__shop');
    const adjustFontSize = (domHeight: number) => {
      list.forEach((node) => {
        const height = node.offsetHeight;
        if (height > domHeight) {
          node.classList.add('fontSize_s');
        }
      });
    };
    adjustFontSize(150);
    if (vw < 769) {
      adjustFontSize(83);
    } else if (vw < 1106) {
      adjustFontSize(110);
    }
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
