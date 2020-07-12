/* eslint-disable no-debugger, no-console */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth0();
  // useEffect(() => {
  //   (async () => {
  //     if (isAuthenticated) {
  //       const token = await getAccessTokenSilently({
  //         audience: "https://dev-59tm9cah.auth0.com/api/v2/",
  //         scope: "read:current_user update:current_user_metadata"
  //       });
  //     }
  //   })();
  // }, [isAuthenticated]);
  return isAuthenticated && <button onClick={() => logout()}>Log Out</button>;
};

export default LogoutButton;


