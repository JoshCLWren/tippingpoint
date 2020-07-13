import React, {useState } from 'react'
import { useForm } from "react-hook-form"
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from '@apollo/react-hooks';
import { GET_LOCATIONS, CREATE_LOCATION } from "../../GQL/gql";


    const Post = () => {
      const { isAuthenticated } = useAuth0();

      const [state, setState] = useState({
        slug: "",
        gps: ""
      })

      const [createLocation] = useMutation(CREATE_LOCATION,
        {
          update(cache, { data: { createLocation } }) {
            const { locations } = cache.readQuery({ query: GET_LOCATIONS });
            cache.writeQuery({
              query: GET_LOCATIONS,
              data: { locations: locations.concat([createLocation]) },
            });
          }
        }
        )

      const { register, handleSubmit, errors } = useForm();

      const onInputChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
      };
      const onSubmit = () => {
        createLocation({ variables: {slug: state.slug, gps: state.gps} });
        setState({ slug: "", gps: ""});
      };

      return isAuthenticated &&
        <div>
          <h3>Enter a new Location</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Location Name (keep it short like: ALB): </label>
              <input
                name="slug"
                placeholder="Location Name"
                onChange={onInputChange}
                ref={register({ required: true, maxLength: 20 })}
              />
            {errors.slug && <p>Location name is required and should be no more than 20 characters.</p>}
            <label>GPS Coordinates example: -95.760074,36.062184</label>
              <input
                name="gps"
                ref={register({ required: true, minLength: 7, pattern: { value: /^([-]?)([\d]{1,2})(((\.)(\d+)(,)))(([-]?)([\d]{1,3})((\.)(\d+))?)$/g} })}
                placeholder="Gps Coordinates"
                onChange={onInputChange}
              />
            {errors.gps && <p>GPS should be no less than 7 characters, is required, and should be formatted as two positve or negative numbers with decimals seperated by a comma and no space like so: -97.514956,35.562138</p>}
            <input type="submit" />
          </form>

        </div>

    }

export default Post;


