import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <>
        <img src={user.picture} alt={user.name} />
        <p>Welcome {user.name}!</p>
        <p>Where are we going?</p>
      </>
    )
  );
};

export default Profile;