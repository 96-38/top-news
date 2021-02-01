import * as React from 'react';
import '../reset.css';
import './css/header.css';
import logo from './img/Icon.svg';

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__inner">
          <div className="header__logo">
            <img className="header__logo__img" src={logo} alt="logo" />
            <a className="header__logo__title" href="./">
              <h1>News Portal</h1>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
