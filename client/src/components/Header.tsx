import React from 'react';
import '../reset.css';
import './css/header.css';
import logo from './img/Icon.svg';

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__inner">
          <a className="header__logo" href="./">
            <img className="header__logo__img" src={logo} alt="logo" />
            <h1>Top News</h1>
          </a>
        </div>
      </header>
    </>
  );
};
