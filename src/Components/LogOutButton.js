import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently({
          audience: 'https://quickstarts/api',
          scope: 'create:locations',
        });
        console.log(token);
      }
    })();
  }, [isAuthenticated]);
  return isAuthenticated && <button onClick={() => logout()}>Log Out</button>;
};

export default LogoutButton;


