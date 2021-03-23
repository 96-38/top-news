import React, { FC } from 'react';
import '../reset.css';
import './css/header.css';
import logo from './img/Icon.svg';

type Props = {
  pageTitle: string;
};

export const Header: FC<Props> = ({ pageTitle }) => {
  return (
    <>
      <header className="header">
        <div className="header__inner">
          <a className="header__logo" href="./">
            <img className="header__logo__img" src={logo} alt="logo" />
          </a>
        </div>
        <h1 className="header__pageTitle">{pageTitle}</h1>
      </header>
    </>
  );
};
