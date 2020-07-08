import React, {useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
// import { useAuth0 } from "@auth0/auth0-react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_LOCATION = gql`
  mutation CreateLocation($slug: String!, $gps: String!){
    createLocation(
      input:{slug: $slug, gps: $gps}){
    location {
      slug
      gps
    }
  }
}
`;
const DELETE_LOCATIONS = gql`
mutation deleteLocation($id: String!){
  deleteLocation(
    input:{id: $id}){
  location{
    id
    slug
    gps
  }
}
}
`;

    const Post = () => {
      const [state, setState] = useState({
        slug: "",
        gps: ""
      })
      const [createLocation, {data}] = useMutation(CREATE_LOCATION)

      const { register, handleSubmit } = useForm();

      const onInputChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
      };
      const onSubmit = () => {
        debugger
        createLocation({ variables: {slug: state.slug, gps: state.gps} });
        setState({ slug: "", gps: ""});
      };


      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="slug"
              placeholder="Location Name"
              onChange={onInputChange}
              ref={register({ required: true, maxLength: 20 })}
            />
            <input
              name="gps"
              placeholder="Gps Coordinates"
              onChange={onInputChange}
              ref={register({ required: true, minLength: 6 })}
            />
            <input type="submit" />
          </form>

        </div>
      )
    }



export default Post;


