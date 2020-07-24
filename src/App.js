/* eslint-disable no-debugger, no-console */
import React, { useState } from 'react';
import './Components/main.css';
import {MileProvider} from "./Components/TripCalculator/MileContext";
// import Header from "./Components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import NavBar from "./Components/NavBar/Navbar";



function App() {
  const [accessToken, setAccessToken] = useState("");

  const { getAccessTokenSilently, loading } = useAuth0();
    if (loading) {
      return "Loading...";
    }

    const getAccessToken = async () => {
      // getTokenSilently() returns a promise
      try {
        const token = await getAccessTokenSilently({
          audience: "https://dev-59tm9cah.auth0.com/api/v2/",
          scope: "read:current_user update:current_user_metadata"
        });
        setAccessToken(token);
        // console.log(token);
      } catch (e) {
        console.log(e);
      }
    };
    getAccessToken();



  const httpLink = createHttpLink({
    uri: 'https://tipping-point-api.herokuapp.com/api/v2/graphql/'
  });

  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      };
    } else {
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


  return (
    <ApolloProvider client={client}>
     <MileProvider>
      <NavBar />
     </MileProvider>
    </ApolloProvider>
  );
}

export default App;
