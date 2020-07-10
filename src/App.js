/* eslint-disable no-debugger, no-console */
import React, { useState } from 'react';
import './Components/main.css';
import {MileProvider} from "./Components/MileContext";
import Header from "./Components/Header";
import TotalDrivers from './Components/TotalDrivers';
import CustomTrip from "./Components/CustomTrip";
import RentalPaddingDay from './Components/RentalPaddingDay';
import Totals from './Components/Totals'
import DetailedExpenses from './Components/DetailedExpenses';
import Get from './Components/Get.js'
import Post from './Components/Post.js'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import Table from 'react-bootstrap/Table'


function App() {
  const { isAuthenticated, user } = useAuth0();
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
    uri: 'http://localhost:5000/api/v2/graphql/'
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
      <Header />
       <div className="column">
         <form>
         <Totals />
         <CustomTrip />
         <TotalDrivers />
         <RentalPaddingDay />
         </form>
       </div>
       <div className="column">
         <DetailedExpenses />
       </div>
       <Table striped bordered hover>
          <thead>
            <tr>
              <th>Location Name</th>
              <th>GPS Coordinates</th>
              <th>Options</th>
            </tr>
          </thead>
          <Get />
        </Table>
       <Post />
     </MileProvider>
    </ApolloProvider>
  );
}

export default App;
