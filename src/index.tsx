// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import './scss/index.scss';
import reportWebVitals from './reportWebVitals';
// Providers
import client from './apollo';
import { LangProvider } from './contexts/Lang.context';
import { SnackbarProvider } from './contexts/Snackbar.context';
import { ModalProvider } from './contexts/Modal.context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LangProvider>
        <SnackbarProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </SnackbarProvider>
      </LangProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
