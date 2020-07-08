import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import ApolloClient from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:5000/api/v2/graphql/',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Auth0Provider
      domain="dev-59tm9cah.auth0.com"
      clientId="wZw64vPvPipSdyR4S45r1to4gnkGWrwr"
      redirectUri={window.location.origin}
      >
        <App />
    </Auth0Provider>
  </ApolloProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
