import React, {useState } from 'react'
import { useForm } from "react-hook-form"
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from '@apollo/react-hooks';
import { GET_LOCATIONS, CREATE_LOCATION } from "../../GQL/gql";

  const EditLocation = () => {
    return (
    <h1>
      Edit
    </h1>
    )
  }

export default EditLocation