import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  if (isAuthenticated){
    var token = getAccessTokenSilently({
    audience: 'https://quickstarts/api',
    scope: 'create:locations'
  })
  console.log(token)
}

  return (
  isAuthenticated && (
    <button onClick={() => logout()}>Log Out</button>
  )
  )
};

export default LogoutButton;