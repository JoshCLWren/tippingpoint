import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "../Home";
import TripCalculator from "../TripCalculator/TripCalculator";
import Locations from "../Locations/Locations";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Profile from './Profile';
import LoginButton from './LogInButton';
import LogoutButton from './LogOutButton';
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";



const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  if(!isAuthenticated) {
    return <Header />
  }

  return(
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand >The Pivotal Point</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link ><Link to="/">Home</Link></Nav.Link>
            <Nav.Link ><Link to={"/tripCalculator"}>Trip Calculator</Link></Nav.Link>
            <Nav.Link ><Link to={"/locations"}>Locations</Link></Nav.Link>
            <Nav.Link>
              <LoginButton />
            </Nav.Link>
            <Nav.Link>
              <LogoutButton />
            </Nav.Link>
          </Nav>
          <Profile />
        </Navbar.Collapse>
      </Navbar>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/tripCalculator" component={TripCalculator}/>
          <Route path="/locations" component={Locations}/>
        </Switch>
    </Router>
  )


}

export default NavBar;