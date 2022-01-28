/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-use-before-define
import React from 'react';

const Landing: React.FC = () => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <h1 className="title">Ged-nextgen</h1>
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href="/login/user" className="button is-light">
                  Espace collaborateur
                </a>
                <a href="/login/admin" className="button is-primary">
                  Espace administrateur
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Primary bold title</h1>
            <h2 className="subtitle">Primary bold subtitle</h2>
          </div>
        </div>
      </section>
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Medium title</h1>
            <h2 className="subtitle">Medium subtitle</h2>
          </div>
        </div>
      </section>
    </>
  );
};
export default Landing;
/* eslint-enable jsx-a11y/alt-text */
/* eslint-enable react/self-closing-comp */
/* eslint-enable jsx-a11y/anchor-is-valid */
