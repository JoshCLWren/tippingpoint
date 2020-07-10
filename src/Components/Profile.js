import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>Welcome {user.name}!</h2>
        <h3>Where are we going?</h3>
      </div>
    )
  );
};

export default Profile;