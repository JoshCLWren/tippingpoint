/* eslint-disable no-debugger, no-console */
import React, { useState } from 'react';
import './Components/main.css';
import {MileProvider} from "./Components/TripCalculator/MileContext";
import Header from "./Components/Header";
// import TotalDrivers from './Components/TripCalculator/TotalDrivers';
// import CustomTrip from "./Components/TripCalculator/CustomTrip";
// import RentalPaddingDay from './Components/TripCalculator/RentalPaddingDay';
// import Totals from './Components/Totals'
// import DetailedExpenses from './Components/DetailedExpenses';
// import Get from './Components/Locations/Get.js'
// import Post from './Components/Locations/Post.js'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./Components/Home";
import TripCalculator from "./Components/TripCalculator/TripCalculator";
import Locations from "./Components/Locations/Locations";


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
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/tripCalculator">Trip Calculator</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/locations">Locations</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/" component={Home}/>
            <Route path="/tripCalculator" component={TripCalculator}/>
            <Route path="/locations" component={Locations}/>
          </Switch>
        </div>
      </Router>


     </MileProvider>
    </ApolloProvider>
  );
}

export default App;
