/* eslint-disable no-debugger, no-console */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";



ReactDOM.render(

    <Auth0Provider
      domain="dev-59tm9cah.auth0.com"
      clientId="wZw64vPvPipSdyR4S45r1to4gnkGWrwr"
      redirectUri={window.location.origin}
      audience="https://dev-59tm9cah.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
        <App />
    </Auth0Provider>,

  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
