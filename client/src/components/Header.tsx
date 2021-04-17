import React, { FC } from 'react';
import '../reset.css';
import './css/header.css';

type Props = {
  pageTitle: string;
  icon: string;
};

export const Header: FC<Props> = ({ pageTitle, icon }) => {
  return (
    <>
      <header className="header">
        <div className="header__inner">
          <a className="header__logo" href="./">
            <img className="header__logo__img" src={icon} alt="logo" />
          </a>
        </div>
        <h1 className="header__pageTitle">{pageTitle}</h1>
      </header>
    </>
  );
};
